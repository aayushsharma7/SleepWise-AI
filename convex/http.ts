import { httpRouter } from "convex/server";
import {WebhookEvent} from "@clerk/nextjs/server";
import { Webhook } from "svix";
import {api} from "./_generated/api";
import {httpAction} from "./_generated/server";
import {GoogleGenerativeAI} from "@google/generative-ai";

const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx,request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return  new Response("No svix headers found", {
                status: 400, //malicious user
            });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            })  as WebhookEvent;
        } catch (err) {
            console.error("Error verifying webhook:", err);
            return new Response("Error occured", {
                status: 400, //malicious user
            });
        }

        const eventType = evt.type;


        if(eventType=="user.created"){
            const {id,first_name,last_name,image_url,email_addresses} = evt.data
            const email = email_addresses[0].email_address;
            const name = `${first_name || "" } ${last_name || ""}`.trim();
             
            try {
                await ctx.runMutation(api.users.syncUser, {
                    email,
                    name,
                    image: image_url,
                    clerkId: id
                })
            } catch (error) {
                console.log("Error creating user:", error);
                return new Response("Error creating user", {
                    status: 500, //internal server error
                });
            }
        }

        if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

        return new Response("Webhook processed successfully", {status: 200});

    }),

});

// validate and fix workout plan to ensure it has proper numeric types
function validateSleepPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    timeline: plan.timeline.map((timeline: any) => ({
      day: timeline.day,
      routines: timeline.routines.map((routine: any) => ({
        time: routine.time,
        activity: typeof routine.activity === "string" ? routine.activity : parseInt(routine.activity) || 1,
        notes: typeof routine.notes === "string" ? routine.notes : parseInt(routine.notes) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validaterecPlan(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    sleepEfficiency: plan.sleepEfficiency,
    solutions: plan.solutions.map((solution: any) => ({
      name: solution.name,
      tips: solution.tips,
    })),
  };
  return validatedPlan;
}

function validatesleepScore(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    score: plan.score,
    reason:plan.reason,
  };
  return validatedPlan;
}

http.route({
    path: "/vapi/generate-program",
    method: "POST",
    handler: httpAction(async (ctx,request) => {
        try {
            const payload = await request.json();

            const {
                user_id,
                age,
                profession,
                wakeuptime,
                sleeptime,
                problem,
                workhours,
                sleep_goal,
                avg_sleep,
            }
             = payload;

            console.log("Payload is here", payload);

            //gemini to generate workout and diet plan
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-001",
                generationConfig: {
                    temperature: 0.4, //lower for more predictable output
                    topP: 0.9,
                    responseMimeType: "application/json",
                }
            })

            const sleepPrompt = `You are a certified sleep coach and lifestyle planner. You will generate a personalized daily sleep routine plan based on:

                - Age: ${age}
                - Profession: ${profession}
                - Wake-up Time: ${wakeuptime}
                - Sleep Time: ${sleeptime}
                - Reported Sleep Problems: ${problem}
                - Daily Work or Study Hours: ${workhours}
                - Sleep Goal: ${sleep_goal}
                - Average Current Sleep (hrs): ${avg_sleep}

                As a sleep specialist:
                - Create a daily routine that balances work/study and sleep needs
                - Suggest exact wind-down times and morning routines around their schedule
                - Adjust recommendations based on sleep issues (e.g., insomnia, late phone use, irregular hours)
                - Account for their profession and optimize sleep quality without disrupting productivity
                - Include blocks like "Wind Down", "Phone Off", "In Bed", "Wake Up", "Light Exposure", "Focus Block", etc.
                - Dont repeat the schedule for all days, make schedule of each day unique and natural.
                - Give schedule for whole day i.e 24hrs and make study hours/work hours fit into properly with sleep as required.
                - Make the plans realistic and human like dont just change the wake up and sleep times on all days just to be unique, make the whol daily routines natural and full personalised for the profession and workhours/studyhours.
                

                CRITICAL SCHEMA INSTRUCTIONS:
                - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
                - Every time block must be part of a specific day (e.g., "Monday") inside a timeline object
                - Time must be in clear format (e.g., "10:00 PM")
                - DO NOT include generic text like "Sleep early" — be precise
                - All string values should be clean and free from excessive explanation

                Return a JSON object with this EXACT structure:
                {
                "schedule": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "timeline": [
                    {
                    "day": "Monday",
                    "routines": [
                        {
                        "time": "9:30 PM",
                        "activity": "Wind Down",
                        "notes": "Avoid screens, dim the lights",
                        "duration": "30 min",
                        "description": "Start relaxing activity like reading or journaling"
                        },
                        {
                        "time": "10:00 PM",
                        "activity": "In Bed",
                        "notes": "Lights fully off",
                        "duration": "8 hrs",
                        "description": "Target sleep duration"
                        },
                        {
                        "time": "6:00 AM",
                        "activity": "Wake Up",
                        "notes": "Expose to natural light",
                        "duration": "15 min",
                        "description": "Helps regulate circadian rhythm"
                        }
                    ]
                    }
                ]
                }

                DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            
            


            const recPrompt = `You are a certified sleep specialist and behavioral health expert creating personalized sleep improvement recommendations based on:

                    - Age: ${age}
                    - Profession: ${profession}
                    - Average Sleep Duration: ${avg_sleep} hours
                    - Sleep Timing: ${sleeptime} to ${wakeuptime}
                    - Daily Work or Study Hours: ${workhours}
                    - Reported Sleep Problems: ${problem}
                    - Stated Sleep Goal: ${sleep_goal}

                    As a sleep expert:
                    - Identify key behavioral patterns that may be contributing to poor or suboptimal sleep
                    - Provide actionable, evidence-based suggestions to improve sleep hygiene
                    - Tailor tips to the user's lifestyle (student, office worker, etc.) and daily demands
                    - Include cognitive, behavioral, and environmental suggestions if appropriate

                    CRITICAL SCHEMA INSTRUCTIONS:
                    - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
                    - "sleepEfficiency" MUST be a NUMBER from 0 to 100, not a string
                    - "solutions" MUST be an array of objects, each with a "name" and a "tips" array
                    - Each solution MUST contain 2–4 short, practical tips — written as individual strings
                    - DO NOT include any additional comments, explanation, or extra fields

                    Return a JSON object with this EXACT structure and no other fields:
                    {
                    "sleepEfficiency": 78,
                    "solutions": [
                        {
                        "name": "Nighttime Phone Usage",
                        "tips": [
                            "Avoid screens at least 45 minutes before bed",
                            "Enable blue light filter after sunset",
                            "Use a physical alarm clock instead of your phone"
                        ]
                        },
                        {
                        "name": "Irregular Bedtime",
                        "tips": [
                            "Set a consistent bedtime and wake-up time",
                            "Avoid caffeine after 4 PM",
                            "Create a short wind-down routine before bed"
                        ]
                        }
                    ]
                    }

                    DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            

            const scorePrompt = `You are a professional sleep analyst evaluating a user's overall sleep quality based on:

                - Age: ${age}
                - Profession: ${profession}
                - Average Sleep Duration: ${avg_sleep} hours
                - Wake-up Time: ${wakeuptime}
                - Sleep Time: ${sleeptime}
                - Daily Work or Study Hours: ${workhours}
                - Sleep Goal: ${sleep_goal}
                - Reported Sleep Problems: ${problem}

                As an experienced evaluator:
                - Consider how aligned the sleep duration and timing are with the user’s lifestyle and sleep goal
                - Account for harmful sleep habits or constraints based on profession or schedule
                - Deduct points for inconsistencies, screen time, or poor routine alignment
                - Provide a brief reason explaining the score in a sentence

                CRITICAL SCHEMA INSTRUCTIONS:
                - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
                - "score" MUST be a NUMBER from 0 to 100, not a string
                - "reason" MUST be a SINGLE STRING — one line explaining the score
                - DO NOT include any additional advice, explanations, or unrelated details

                Return a JSON object with this EXACT structure:
                {
                "score": 82,
                "reason": "Late sleep time and irregular wake-up pattern reduce recovery quality"
                }

                DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

            const [sleepResult, recResult, scoreResult] = await Promise.all([
                    model.generateContent(sleepPrompt),
                    model.generateContent(recPrompt),
                    model.generateContent(scorePrompt),
                ]);

            
            const scoreText = scoreResult.response.text();
            let sleepScore = JSON.parse(scoreText);
            sleepScore = validatesleepScore(sleepScore);
            console.log("Validated sleep score:", sleepScore);


            
            const sleepPlanText = sleepResult.response.text();

            //validate workout plan
            let sleepPlan = JSON.parse(sleepPlanText);
            sleepPlan = validateSleepPlan(sleepPlan);

            
            const recPlanText = recResult.response.text();
            let recPlan = JSON.parse(recPlanText);
            recPlan = validaterecPlan(recPlan);
            console.log("Validated tips:", recPlan);

            //save to DB: convex

            const planId = await ctx.runMutation(api.plans.createPlan, {
                userId: user_id,
                recPlan,
                isActive: true,
                sleepPlan,
                sleepScore,
                name: `${sleep_goal} Plan - ${new Date().toLocaleDateString()}`
            })

            return new Response(JSON.stringify({
                    succes: true,
                    data: {
                        planId,
                        sleepPlan,
                        recPlan,
                        sleepScore,
                    },
                }
            ),
            {
                status: 200, 
                headers: { "Content-Type": "application/json" },
            }
        );


        } catch (error) {
            console.error("Error generating sleep plan:", error);
             return new Response(
                JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : String(error),
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }),
});

export default http;


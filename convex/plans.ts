import { v } from "convex/values";
import { mutation, query } from "./_generated/server";



export const createPlan = mutation ({
    args: {
        userId: v.string(),
        name: v.string(),
        sleepPlan: v.object({
            schedule: v.array(v.string()),
            timeline: v.array(
                v.object({
                    day: v.string(),
                    routines: v.array(
                        v.object({
                            time: v.string(),
                            activity: v.string(),
                            notes: v.string(),
                            duration: v.string(),
                            description:v.string(),
                        })
                    ),
                })
            ),
        }),
        recPlan: v.object({
        sleepEfficiency: v.number(),
        solutions: v.array(
            v.object({
            name: v.string(),
            tips: v.array(v.string()),
            })
        ),
        }),

        sleepScore: v.object({
            score: v.number(),
            reason: v.string(),
        }),

        isActive: v.boolean(),
    },
    handler: async (ctx,args) => {
        const activePlans =  await ctx.db
        .query("plans")
        .withIndex("by_user_id", (q) => q.eq("userId",args.userId))
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect();

        for(const plan of activePlans) {
            await ctx.db.patch(plan._id, { isActive: false });
        }

        const planId = await ctx.db.insert("plans", args)

        return planId;
    }
});

export const getUserPlans = query({
    args: {userId:v.string()},
    handler: async (ctx, args) => {
        const plans = await ctx.db
            .query("plans")
            .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();
        return plans;
    }
})
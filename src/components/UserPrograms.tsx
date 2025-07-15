import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
  Download,
  ArrowRightCircle,
  ArrowRight,
  TargetIcon,
  Target,
  Calendar1Icon,
  Calendar,
  Notebook,
  Loader2,
  Loader2Icon,
  LogIn,
} from "lucide-react";
import { SLEEPWISE_FEATURES } from "@/constants";

import React from "react";
import { SignInButton } from "@clerk/nextjs";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* HEADER- PROGRAM GALLERY */}
        <div className="bg-primary/10 backdrop-blur-sm border border-border rounded-xl overflow-hidden mb-16">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-sm text-primary font-medium">Analyse Sleep</span>
            </div>
            <div className="text-sm text-muted-foreground">Feel Energized</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center ">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground ">Intelligent </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sleep Optimization</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Sleep smarter, live better. Get personalized sleep plans and bedtime coaching designed for your unique lifestyle.
            </p>

            {/* STATS */}
            <div className="flex items-center justify-center gap-16 mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">1000+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                  PLANS TAILORED
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2min</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                  QUICK GENERATION
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                  PERSONALISATION
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-center mt-40">
          <h1 className="font-extrabold  text-8xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Explore our Features</h1>
        </div> */}
        {/* HEADER- PROGRAM GALLERY */}
        <div className="grid grid-cols-2 gap-8 -mt-2">
        <div className="bg-purple-800/20 backdrop-blur-sm border border-border rounded-xl overflow-hidden mb-16 mt-15">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-sm text-primary font-medium">Sleep Score</span>
            </div>
            <div className="text-sm text-muted-foreground">Feel Energized</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center -mt-2">
            <h2 className="font-bold mb-6">
              <span className="text-foreground text-4xl ">Check Your</span>
              <br></br>
              <span className="text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Sleep Score</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Get a personalized sleep score based on your age, profession, sleep habits, and daily workload.
            </p>
            <div className="">
                  <div className="bg-pink-600/10 backdrop-blur-lg rounded-xl p-4 border border-primary/20">
                    <div className="flex flex-col-2 gap-10 justify-center items-center">
                    <div>
                    <div className="flex -mt-3 items-center justify-center  gap-2 mb-3 ml-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">Hey! John Doe</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 font-semibold text-foreground">
                        <span><Loader2Icon className="animate-spin"/></span>
                        <span>Analysing Your Sleep Score..</span>
                      </div>
                      <div className="flex items-center justify-center text-lg gap-2 font-bold bg-gradient-to-r from-yellow-500 to-accent bg-clip-text text-transparent">
                        <span></span>
                        <span>Your Sleep Score is 92/100</span>
                      </div>
                    </div>
                    </div>
                    <div>
                      <div className="  w-30 h-30 animate rounded-full bg-transparent border-green-500 border-6 flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center justify-center w-full px-3">
                          <span className="text-4xl -mt-2 font-bold text-green-500">92%</span>
                          
                        </div>
                      </div>
                      
                    </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
        {/* HEADER- PROGRAM GALLERY */}
       <div className="bg-purple-700/20 backdrop-blur-sm border border-border rounded-xl overflow-hidden mb-16 mt-15">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-sm text-primary font-medium">Routine Planner</span>
            </div>
            <div className="text-sm text-muted-foreground">Fully Personalized</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center -mt-2">
            <h2 className="font-bold mb-6">
              <span className="text-foreground text-4xl ">Tailored Sleep </span>
              <br></br>
              <span className="text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Routines</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Struggling to stay consistent with sleep? Our AI learns about your lifestyle and builds a simple, personalized routine to help you sleep better.            
            
            </p>

            <div className="-mt-4">
                <div className="bg-pink-600/10 backdrop-blur-lg rounded-xl p-4 border border-primary/20">
                  <ul className="font-bold  bg-gradient-to-r from-yellow-500 to-accent bg-clip-text text-transparent text-left">
                    <li>• AI Voice chat to know your workload and sleep habits.</li>
                    <li className="mt-1">• Helps build healthier routines with minimal effort.</li>
                    <li className="mt-1">• Prioritizes consistency without being overly rigid.</li>
                    <li className="mt-1">• Designed for productivity and rest throughout the week.</li>

                  </ul>
                </div>
              </div>
          </div>
        </div>
        </div>
        <section className="w-full px-6 py-24 max-w-4xl mx-auto text-center -mb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to Sleep
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Smarter</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students and professionals who have transformed 
                their sleep and boosted their daily performance with SleepWise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="default" size="lg" className="bg-gradient-to-r from-primary to-accent group min-w-48">
                <Link href={"/generate-program"}>
                    Get Started for Free
                  </Link>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <SignInButton>
              <Button variant="default" size="lg" className="min-w-48 ">
                <LogIn className=" h-4 w-4" />
                Log-In
              </Button>
              </SignInButton>
            </div>
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                💜 Trusted by 1000+ better sleepers • ⭐ 4.9/5 rating • 🔒 Privacy-first approach
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPrograms;

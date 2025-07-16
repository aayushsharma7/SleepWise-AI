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
  Zap,
  Brain,
  CheckCircle,
} from "lucide-react";
import { SLEEPWISE_FEATURES } from "@/constants";

import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

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
            <div className="md:flex items-center justify-center gap-16 mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">1000+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                  PLANS TAILORED
                </p>
              </div>
              <div className="w-px h-12 md:bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2min</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                  QUICK GENERATION
                </p>
              </div>
              <div className="w-px h-12 md:bg-border"></div>
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
        <div className="grid md:grid-cols-2 gap-8 sm:grid-cols-1 -mt-2">
        {/* Sleep Score Card */}
        <Card className="bg-primary/10 backdrop-blur-sm overflow-hidden relative">
          {/* Mac-style window controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <CardHeader className="pb-4 pt-12 -mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Sleep Score</h2>
                  <p className="text-sm text-purple-200">Feel Fresh</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 -mt-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Check Your Sleep Score</h3>
              <p className="text-purple-100 leading-relaxed">
                Get a personalized sleep score based on your age, profession, sleep habits, and daily workload.
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-yellow-300 mb-1">Hey! John Doe</p>
                  <div className="flex items-center gap-2 text-sm text-purple-200">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Analysing Your Sleep Score...
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">92</div>
                  <div className="text-sm text-purple-200">/100</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-300 font-medium">Your Sleep Score</span>
                  <span className="font-medium text-emerald-300">92%</span>
                </div>
                <Progress value={92} className="h-2 [&>*]:bg-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

         <Card className="bg-primary/10 backdrop-blur-sm overflow-hidden relative">
          {/* Mac-style window controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <CardHeader className="pb-4 pt-12 -mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Routine Planner</h2>
                  <p className="text-sm text-purple-200">Fully Personalized</p>
                </div>
              </div>
              <Badge className="bg-violet-500/20 text-violet-300 border-violet-400/30">AI Powered</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 -mt-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Tailored Sleep Routines</h3>
              <p className="text-purple-100 leading-relaxed">
                Struggling to stay consistent with sleep? Our AI learns about your lifestyle and builds a simple,
                personalized routine to help you sleep better.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 -mt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-yellow-300">AI Voice chat to know your workload and sleep habits</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-yellow-300">Helps build healthier routines with minimal effort</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-yellow-300">Prioritizes consistency without being overly rigid</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-yellow-300">Designed for productivity and rest throughout the week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  Moon,
  Sun,
  Clock,
  Target,
  Sparkles,
  Calendar,
  Settings,
  Plus,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Focus,
  Bed,
  TrendingUp,
  User,
  Mail,
  Briefcase,
  MoonStarIcon,
  Home, // Added import for Home icon
  Activity, // Added import for Activity icon
} from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link"

const sampleSleepPlan = {
  userId: "user123",
  name: "Weekly Sleep Optimization Plan",
  sleepPlan: {
    schedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    timeline: [
      {
        day: "Monday",
        routines: [
          {
            time: "6:00 AM",
            activity: "Wake Up & Light Exposure",
            notes: "Open curtains immediately",
            duration: "15 min",
            description: "Natural light helps reset your circadian rhythm.",
          },
          {
            time: "1:00 PM",
            activity: "Focus Block",
            notes: "Deep work session",
            duration: "2 hours",
            description: "Capitalize on post-lunch alertness for demanding tasks.",
          },
          {
            time: "9:30 PM",
            activity: "Wind Down",
            notes: "Read a book, no screens",
            duration: "30 min",
            description: "Signal to your body that it's time to prepare for sleep.",
          },
          {
            time: "10:00 PM",
            activity: "In Bed",
            notes: "Lights fully off",
            duration: "8 hrs",
            description: "Target sleep duration for optimal recovery.",
          },
        ],
      },
      {
        day: "Tuesday",
        routines: [
          {
            time: "6:15 AM",
            activity: "Wake Up & Light Exposure",
            notes: "Step outside for 5 minutes",
            duration: "15 min",
            description: "Morning sunlight exposure boosts alertness.",
          },
          {
            time: "1:15 PM",
            activity: "Focus Block",
            notes: "Creative work session",
            duration: "1.5 hours",
            description: "Use afternoon energy for creative tasks.",
          },
          {
            time: "9:45 PM",
            activity: "Wind Down",
            notes: "Light stretching or meditation",
            duration: "30 min",
            description: "Gentle activities to prepare for rest.",
          },
          {
            time: "10:15 PM",
            activity: "In Bed",
            notes: "Practice deep breathing",
            duration: "8 hrs",
            description: "Consistent sleep duration maintains rhythm.",
          },
        ],
      },
    ],
  },
  recPlan: {
    sleepEfficiency: 85,
    solutions: [
      {
        name: "Consistent Sleep Schedule",
        tips: [
          "Go to bed and wake up at the same time every day, even on weekends.",
          "Avoid hitting the snooze button to establish a strong sleep-wake cycle.",
          "Your body's internal clock thrives on regularity.",
        ],
      },
      {
        name: "Optimize Your Bedroom Environment",
        tips: [
          "Keep bedroom temperature between 65-68°F for optimal sleep.",
          "Use blackout curtains or eye mask to block out light.",
          "Invest in comfortable pillows and mattress for better support.",
          "Remove electronic devices from the bedroom.",
        ],
      },
      {
        name: "Mindful Pre-Sleep Routine",
        tips: [
          "Avoid screens at least 45 minutes before bedtime.",
          "Practice relaxation techniques like deep breathing or meditation.",
          "Create a calming bedtime ritual you can follow consistently.",
          "Keep a journal to clear your mind of daily concerns.",
        ],
      },
    ],
  },
  sleepScore: {
    score: 78,
    reason: "Your sleep schedule is inconsistent, and late-night screen time is affecting your sleep quality.",
  },
  isActive: true,
}

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  profession: "Software Engineer",
  memberSince: "Jan 2024",
  currentStreak: 5,
  totalPlans: 12,
}

const getActivityIcon = (activity: string) => {
  switch (activity) {
    case "Wake Up & Light Exposure || Morning Routine":
      return <Sun className="h-5 w-5" />
    case "Focus Block 1 || Focus Block 2 || Focus Block 3":
      return <Focus className="h-5 w-5" />
    case "Wind Down":
      return <Moon className="h-5 w-5" />
    case "In Bed":
      return <Bed className="h-5 w-5" />
    default:
      return <Clock className="h-5 w-5" />
  }
}




const weeklyProgress = [
  { day: "Mon", completed: true, score: 85 },
  { day: "Tue", completed: true, score: 78 },
  { day: "Wed", completed: false, score: 0 },
  { day: "Thu", completed: false, score: 0 },
  { day: "Fri", completed: false, score: 0 },
  { day: "Sat", completed: false, score: 0 },
  { day: "Sun", completed: false, score: 0 },
]



export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [openRecommendations, setOpenRecommendations] = useState<string[]>(["Consistent Sleep Schedule"])

  const toggleRecommendation = (name: string) => {
    setOpenRecommendations((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
    )
  }
  const { user } = useUser()
  const userId = user?.id as string
  const allPlans = useQuery(api.plans.getUserPlans, { userId })
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null)

  const activePlan = allPlans?.find((plan) => plan.isActive)

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;
  const selectedDayData = currentPlan?.sleepPlan.timeline.find((day) => day.day === selectedDay)
  const today = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
})

const todayRoutines = currentPlan?.sleepPlan.timeline.find((d) => d.day === today)?.routines || []

const now = new Date()

const getTodayIndex = () => {
  const today = new Date().getDay(); // Sunday = 0
  return today === 0 ? 6 : today - 1; // Make Monday = 0
}



const upcomingToday = todayRoutines
  .filter((routine) => {
    const [timeStr, modifier] = routine.time.split(" ")
    const timeParts = timeStr.split(":").map(Number)
    let hours = timeParts[0]
    const minutes = timeParts[1]

    if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12
    if (modifier.toLowerCase() === "am" && hours === 12) hours = 0

    const routineTime = new Date()
    routineTime.setHours(hours, minutes, 0, 0)
    return routineTime > now
  })
  .slice(0, 3) // 👈 LIMIT to 3


  

  return (
    <div className="min-h-screen mt-15">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between md:ml-5 md:mr-5 ">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MoonStarIcon className="h-10 w-10 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-purple-300 text-sm">View your sleep score and optimised plans</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 md:ml-0 ml-10 ">
            <Link
                        href="/generate-program"
                        
            >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Plan
            </Button>
            </Link>
            <Link
                        href="/"
                        
            >
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
              <Home className="h-5 w-5" />
            </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {allPlans && allPlans.length > 0 ? (
          <>
            {/* Profile Card */}
            <Card className="ml-5 mr-5 bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
              <CardContent className="p-6 ml-3 mr-3 -mt-4 -mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="w-30 h-30 ring-4 ring-purple-400/50">
                        <img
                          src={user?.imageUrl}
                          alt={user?.fullName || "Profile"}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="bg-purple-600 text-white text-2xl">
                          {user?.fullName || "No Name"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{user?.fullName || "No Name"}</h2>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-gray-300">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{user?.primaryEmailAddress?.emailAddress}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{userData.currentStreak}</div>
                          <div className="text-xs text-gray-400">Streak</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{allPlans.length}</div>
                          <div className="text-xs text-gray-400">Plans Created</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{currentPlan?.sleepScore.score}</div>
                          <div className="text-xs text-gray-400">Sleep Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600/20 text-green-300 border-green-400/50">Premium Member</Badge>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/50">Active Plan</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Plan created on</div>
                      <div className="text-white font-medium">
                        <span>
                          {currentPlan?._creationTime &&
                            new Date(currentPlan._creationTime)
                              .toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .replace(/am|pm/, (match) => match.toUpperCase())}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 bg-transparent"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overview Cards */}
            <div className="ml-5 mr-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
                <CardHeader className="-mt-2 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/90">Sleep Score</CardTitle>
                  <div className="p-2 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
                    <Target className="h-4 w-4 text-purple-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="-mt-6 mb-5 text-5xl font-bold text-white">{currentPlan?.sleepScore.score}</div>
                  <p className="text-xs text-white/70">{currentPlan?.sleepScore.reason}</p>
                  <div className="mt-3">
                    <Progress value={sampleSleepPlan.sleepScore.score} className="h-2 [&>*]:bg-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-600/30 to-yellow-600/20  border-orange-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
                <CardHeader className="-mt-2 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/90">Sleep Efficiency</CardTitle>
                  <div className="p-2 bg-orange-500/20 rounded-full group-hover:bg-orange-500/30 transition-colors">
                    <Sparkles className="h-4 w-4 text-orange-300 " />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-white -mt-6 mb-5">{currentPlan?.recPlan.sleepEfficiency}%</div>
                  <p className="text-xs text-white/70">Optimization level</p>
                  <div className="mt-3">
                    <Progress value={sampleSleepPlan.recPlan.sleepEfficiency} className="h-2 [&>*]:bg-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className=" bg-gradient-to-br from-green-600/40 to-emerald-600/20 border-green-400/30  backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
                <CardHeader className="-mt-2 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/90">Active Plan</CardTitle>
                  <div className="p-2  bg-green-500/20 group-hover:bg-green-500/30 rounded-full  transition-colors">
                    <Calendar className="h-4 w-4  text-green-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-white -mt-6 mb-5">7 Days</div>
                  <p className="text-xs text-white/70">Weekly optimization plan</p>
                  <div className="mt-3 flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-6 ml-5 mr-5 flex">
              <div className="flex items-center justify-center">
              <TabsList className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm px-1 py-2">
                <TabsTrigger value="overview" className="px-3 py-3 text-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="schedule" className=" px-3 py-3 text-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-600 px-3 py-3 text-md data-[state=active]:text-white">
                  Recommendations
                </TabsTrigger>
              </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sleep Score Card */}
                  <Card className="bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Target className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-white text-xl">Your Sleep Score</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400">An overview of your sleep quality.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                      <div className="relative w-48 h-48 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-800"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - ((currentPlan?.sleepScore.score ?? 0) / 100))}`}
                            className="text-purple-500 transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-bold text-white">{currentPlan?.sleepScore.score}</span>
                          <span className="text-gray-400 text-sm">out of 100</span>
                        </div>
                      </div>
                      <h4 className="text-white font-medium">Reason:</h4>
                      <p className="text-gray-400 italic text-sm leading-relaxed">&quot;{currentPlan?.sleepScore.reason}&quot;</p>
                    </CardContent>
                  </Card>

                  {/* Weekly Progress */}
                  <Card className="bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
                    
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white">Weekly Progress</CardTitle>
                      </div>
                      <CardDescription className="text-gray-400">Track your daily sleep routine completion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-7 gap-2 ">
                        {weeklyProgress.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-gray-400 mb-2 ">{day.day}</div>
                            <div
                              className={`ml-6 w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                                day.completed
                                  ? "bg-green-500/20 border-2 border-green-500 text-green-400"
                                  : "bg-gray-800 border-2 border-gray-700 text-gray-500"
                              }`}
                            >
                              {day.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            {day.completed && <div className="text-xs text-green-400 mt-1 ml-1">{day.score}</div>}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Completion Rate</span>
                          <span className="text-white font-medium">2/7 days</span>
                        </div>
                        <Progress value={28.5} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Average Score</span>
                          
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Upcoming Activities */}
                <Card className="bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-blue-400" />
                      <CardTitle className="text-white">Today&apos;s Upcoming Activities</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Your remaining sleep routine activities for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {upcomingToday.length > 0 ? (
    upcomingToday.map((routine, index) => (
      <div
        key={index}
        className="p-4 bg-gradient-to-br from-[#1b002f] via-[#2c0050] to-[#3b0074] rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-colors"
      >
        <div className="flex items-center space-x-3 mb-2">
          {getActivityIcon(routine.activity)}
          <span className="text-white font-medium">{routine.activity}</span>
        </div>
        <div className="text-sm text-gray-400 mb-1">{routine.time}</div>
        <Badge variant="outline" className="border-purple-400/50 text-purple-300 text-xs">
          Upcoming
        </Badge>
      </div>
    ))
  ) : (
    <p className="text-gray-400">No more activities for today 🎉</p>
  )}
</div>

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <CardTitle className="text-white text-xl">Your Weekly Schedule</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      A day-by-day guide to building a better sleep routine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Day Selector */}
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {currentPlan?.sleepPlan.schedule.map((day) => (
                        <Button
                          key={day}
                          variant={selectedDay === day ? "default" : "ghost"}
                          className={`px-6 py-2 rounded-full whitespace-nowrap ${
                            selectedDay === day
                              ? "bg-purple-600 text-white"
                              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                          }`}
                          onClick={() => setSelectedDay(day)}
                        >
                          {day.slice(0, 3)}
                        </Button>
                      ))}
                    </div>


                    {/* Timeline */}
                    <div className="space-y-6">
                      {selectedDayData?.routines.map((routine, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          {/* Timeline Line */}
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center text-purple-400">
                              {getActivityIcon(routine.activity)}
                            </div>
                            {index < selectedDayData.routines.length - 1 && (
                              <div className="w-0.5 h-16 bg-gray-700 mt-2"></div>
                            )}
                          </div>
                          {/* Content */}
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-white font-semibold text-lg">{routine.activity}</h3>
                              <div className="text-gray-400 text-sm">
                                {routine.time} • {routine.duration}
                              </div>
                            </div>
                            <p className="text-gray-400 mb-3">{routine.description}</p>
                            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                              <span className="text-purple-400 font-medium text-sm">Note: </span>
                              <span className="text-purple-300 text-sm">{routine.notes}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Recommendations */}
              <TabsContent value="recommendations" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#0a0613] via-[#1a1028] to-[#302044] border-purple-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-white text-xl">AI Recommendations</CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">Sleep Efficiency</div>
                        <div className="text-2xl font-bold text-purple-400">{currentPlan?.recPlan.sleepEfficiency}%</div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-400">
                      Personalized tips to improve your sleep hygiene.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPlan?.recPlan.solutions.map((solution, index) => (
                      <Collapsible
                        key={index}
                        open={openRecommendations.includes(solution.name)}
                        onOpenChange={() => toggleRecommendation(solution.name)}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg transition-colors">
                          <span className="text-white font-medium">{solution.name}</span>
                          {openRecommendations.includes(solution.name) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="space-y-3 mt-3">
                            {solution.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start space-x-3">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div>
            <p className="text-center text-gray-400">No plans created yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

import {defineSchema, defineTable} from 'convex/server'
import {v} from 'convex/values'

export default defineSchema({

    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
    }) .index("by_clerk_id", ["clerkId"]),

    plans: defineTable({
        userId: v.string(),
        name: v.string(),
        sleepPlan: v.object({
            schedule: v.array(v.string()),
            timeline: v.array(v.object({
                day: v.string(),
                routines: v.array(v.object({
                    time: v.string(),
                    activity: v.optional(v.string()),
                    notes: v.optional(v.string()),
                    duration: v.optional(v.string()),
                    description: v.optional(v.string()),
                    exercises: v.optional(v.array(v.string())),
                }))
            }))
        }),

        recPlan: v.object({
            sleepEfficiency: v.number(),
            solutions: v.array(v.object({
                name: v.string(),
                tips: v.array(v.string())
            }))
        }),

        sleepScore: v.object({
            score: v.number(),
            reason: v.string(),
        }),

        isActive: v.boolean(),
    })
        .index("by_user_id", ["userId"]) 
        .index("by_active",["isActive"]),
})
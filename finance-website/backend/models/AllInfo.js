import mongoose from "mongoose";

const allInfoSchema = mongoose.Schema(
    {
        userName: {
            type: String
        },
        incomes: {
            type: Array
        },
        expenses: {
            type: Array
        },
        subscriptions: {
            type: Array
        },
        incomeGoal: {
            type: Number
        }
    },
);

export const allInfo = mongoose.model('allInfo', allInfoSchema)
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

const allInfo = mongoose.model('allInfo', allInfoSchema)

module.exports = allInfo
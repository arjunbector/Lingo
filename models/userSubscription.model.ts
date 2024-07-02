import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSubscriptionSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    stripeCustomerId: {
        type: String,
        required: true,
        unique: true
    },
    stripeSubscriptionId: {
        type: String,
        required: true,
        unique: true
    },
    stripePriceId: {
        type: String,
        required: true,
    },
    stripeCurrentPeriodEnd: {
        type: Date,
        required: true,
    },

})

export const UserSubscription = mongoose.models.UserSubscription || mongoose.model("UserSubscription", userSubscriptionSchema);
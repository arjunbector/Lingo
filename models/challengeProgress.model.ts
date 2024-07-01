import mongoose, { Schema } from "mongoose";
import { use } from "react";

const challengeProgressSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    challengeId: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const challengeProgress = mongoose.models.ChallengeProgress || mongoose.model('ChallengeProgress', challengeProgressSchema);
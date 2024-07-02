import mongoose, { Schema } from "mongoose";

const challengeOptionsSchema = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true
    },
    imageSrc: {
        type: String,
        required: false
    },
    audioSrc: {
        type: String,
        required: false
    }
});
export const ChallengeOptions = mongoose.models.ChallengeOptions || mongoose.model('ChallengeOptions', challengeOptionsSchema);
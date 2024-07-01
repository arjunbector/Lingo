import mongoose, { Schema } from "mongoose";
export enum challengesEnum {
    "SELECT",
    "ASSIST"
}
const challengeSchema = new Schema({
    lessonId: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    type: {
        type: String,
        enum: challengesEnum,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
})
export const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
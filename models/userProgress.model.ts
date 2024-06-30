import mongoose, { Schema } from "mongoose";
// export interface IUserProgress extends Document {
//     _id: string;
//     userId: string;
//     userName: string;
//     userImageSrc: string;
//     activeCourseId: string;
//     hearts: number;
//     points: number;
// }
const userProgressSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        default: "guest"
    },
    userName: {
        type: String,
        required: true,
        default: "Guest User"
    },
    userImageSrc: {
        type: String,
        required: true,
        default: "/mascot.svg"
    },
    activeCourseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    hearts: {
        type: Number,
        required: true,
        default: 5
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);
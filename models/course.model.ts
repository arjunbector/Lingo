import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    _id: string;
    title: string;
    imageSrc: string;
}

const courseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

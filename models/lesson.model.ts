import mongoose, { Schema, Document } from 'mongoose';

const lessonSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    unitId: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    order: {
        type: Number,
        required: true
    }
})

export const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
import mongoose, { Schema, Document } from 'mongoose';
const unitSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    order:{
        type: Number,
        required: true
    }
});

export const Unit = mongoose.models.Unit || mongoose.model('Unit', unitSchema);
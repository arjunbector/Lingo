import { Challenge } from "@/models/challenge.model";
import { ChallengeOptions } from "@/models/challengeOptions.model";
import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { Unit } from "@/models/unit.model";
import { UserProgress } from "@/models/userProgress.model";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};
const COURSES = [
    {
        title: "Spanish",
        imageSrc: "/Spanish.svg",
    },
    {
        title: "French",
        imageSrc: "/French.svg",
    },
    {
        title: "Croatian",
        imageSrc: "/Croatian.svg",
    },
    {
        title: "Italian",
        imageSrc: "/Italian.svg",
    }
]

async function main() {
    console.log("seeding  DB");
    try {
        connectToDB();
        // Clear the database
        await Course.collection.drop();
        await UserProgress.collection.drop();
        await Unit.collection.drop();
        await Lesson.collection.drop();
        await Challenge.collection.drop();
        await ChallengeOptions.collection.drop();

        await Course.insertMany(COURSES);
        const courses = await Course.find();
        await Unit.create({
            courseId: courses[0]._id,
            title: "Unit 1",
            description: "Unit 1 description",
            order: 1
        })

        const units = await Unit.find();
        await Lesson.insertMany([
            {
                unitId: units[0]._id,
                order: 1,
                title: "Nouns"
            },
            {
                unitId: units[0]._id,
                order: 2,
                title: "Verbs"
            },
            // New lessons added below
            {
                unitId: units[0]._id,
                order: 3,
                title: "Adjectives"
            },
            {
                unitId: units[0]._id,
                order: 4,
                title: "Adverbs"
            },
            {
                unitId: units[0]._id,
                order: 5,
                title: "Prepositions"
            },
            {
                unitId: units[0]._id,
                order: 6,
                title: "Conjunctions"
            },
        ])

        const lessons = await Lesson.find();
        await Challenge.insertMany([
            {
                lessonId: lessons[0]._id, // nouns
                type: "SELECT",
                order: 1,
                question: `What is the Spanish word for "the man"?`,
            },
        ]);
        const challenges = await Challenge.find();
        await ChallengeOptions.insertMany([
            {
                challengeId: challenges[0]._id,
                imageSrc: "/man.svg",
                text: "el hombre",
                correct: true,
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: challenges[0]._id,
                imageSrc: "/woman.svg",
                text: "la mujer",
                correct: false,
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: challenges[0]._id,
                imageSrc: "/robot.svg",
                text: "el robot",
                correct: false,
                audioSrc: "/es_robot.mp3"
            }
        ]);

        console.log('Courses seeded');
    }
    catch (e) {
        console.error(e);
        throw new Error('Failed to seed database');
    }
}

main();
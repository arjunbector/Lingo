import { Challenge } from "@/models/challenge.model";
import { ChallengeOptions } from "@/models/challengeOptions.model";
import { ChallengeProgress } from "@/models/challengeProgress.model";
import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { Unit } from "@/models/unit.model";
import { UserProgress } from "@/models/userProgress.model";
import { UserSubscription } from "@/models/userSubscription.model";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
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
];

async function main() {
    console.log("Seeding DB");
    try {
        await connectToDB();

        // Clear the database
        await Course.deleteMany({});
        await Unit.deleteMany({});
        await Lesson.deleteMany({});
        await Challenge.deleteMany({});
        await ChallengeOptions.deleteMany({});
        await ChallengeProgress.deleteMany({});
        await UserProgress.deleteMany({});
        await UserSubscription.deleteMany({});

        // Insert Courses
        await Course.insertMany(COURSES);
        const courses = await Course.find();

        // Insert Units
        await Unit.create({
            courseId: courses[0]._id,
            title: "Spanish Unit 1",
            description: "Nouns",
            order: 1
        });

        const units = await Unit.find();

        // Insert Lessons
        await Lesson.insertMany([
            {
                unitId: units[0]._id,
                order: 1,
                title: "Nouns 1"
            },
            {
                unitId: units[0]._id,
                order: 2,
                title: "Nouns 2"
            },
        ]);

        const lessons = await Lesson.find();

        // Insert Challenges
        await Challenge.insertMany([
            {
                lessonId: lessons[0]._id,
                type: "SELECT",
                order: 1,
                question: `What is the Spanish word for "the man"?`,
            },
            {
                lessonId: lessons[0]._id,
                type: "SELECT",
                order: 2,
                question: `What is the Spanish word for "the woman"?`,
            },
            {
                lessonId: lessons[0]._id,
                type: "SELECT",
                order: 3,
                question: `What is the Spanish word for "the apple"?`,
            },
            {
                lessonId: lessons[0]._id,
                type: "ASSIST",
                order: 4,
                question: `"The Man"`,
            },
            {
                lessonId: lessons[1]._id,
                type: "ASSIST",
                order: 1,
                question: `"the teacher"`,
            },
            {
                lessonId: lessons[1]._id,
                type: "SELECT",
                order: 2,
                question: `What is the Spanish word for "the robot"?`,
            }
        ]);

        const challenges = await Challenge.find();

        // Insert Challenge Options
        await ChallengeOptions.insertMany([
            // Options for "the man"
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
            },
            // Options for "the woman"
            {
                challengeId: challenges[1]._id,
                imageSrc: "/woman.svg",
                text: "la mujer",
                correct: true,
                audioSrc: "/es_woman.mp3"
            },
            {
                challengeId: challenges[1]._id,
                imageSrc: "/man.svg",
                text: "el hombre",
                correct: false,
                audioSrc: "/es_man.mp3"
            },
            // Options for "the apple"
            {
                challengeId: challenges[2]._id,
                imageSrc: "/apple.svg",
                text: "la manzana",
                correct: true,
                audioSrc: "/es_apple.mp3"
            },
            {
                challengeId: challenges[2]._id,
                imageSrc: "/orange.svg",
                text: "la naranja",
                correct: false,
                audioSrc: "/es_orange.mp3"
            },
            // Options for "the man" in ASSIST challenge
            {
                challengeId: challenges[3]._id,
                audioSrc: "/es_man.mp3",
                text: "el hombre",
                correct: true,
            },
            {
                challengeId: challenges[3]._id,
                audioSrc: "/es_woman.mp3",
                text: "la mujer",
                correct: false,
            },
            {
                challengeId: challenges[3]._id,
                audioSrc: "/es_robot.mp3",
                text: "el robot",
                correct: false,
            },
            // Options for "the teacher
            {
                challengeId: challenges[4]._id,
                text: "el maestro",
                correct: true,
                audioSrc: "/es_teacher.mp3"
            },
            {
                challengeId: challenges[4]._id,
                text: "el hombre",
                correct: false,
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: challenges[4]._id,
                text: "el robot",
                correct: false,
                audioSrc: "/es_robot.mp3"
            },
            {
                challengeId: challenges[4]._id,
                text: "la mujer",
                correct: false,
                audioSrc: "/es_woman.mp3"
            },
            // Options for "to run"
            {
                challengeId: challenges[5]._id,
                text: "el hombre",
                correct: false,
                audioSrc: "/es_man.mp3"
            },
            {
                challengeId: challenges[5]._id,
                text: "el robot",
                correct: true,
                audioSrc: "/es_robot.mp3"
            },
            {
                challengeId: challenges[5]._id,
                text: "la mujer",
                correct: false,
            }

        ]);

        // Existing code to insert the first unit, lessons, and challenges...

        // Insert a second Unit for Verbs
        await Unit.create({
            courseId: courses[0]._id,
            title: "Spanish Unit 2",
            description: "Verbs",
            order: 2
        });

        // Fetch the updated list of units to include the new Verbs unit
        const updatedUnits = await Unit.find();

        // Insert Lessons for the Verbs Unit
        await Lesson.insertMany([
            {
                unitId: updatedUnits[1]._id, // Assuming this is the Verbs unit
                order: 1,
                title: "Verbs 1"
            },
            {
                unitId: updatedUnits[1]._id, // Assuming this is the Verbs unit
                order: 2,
                title: "Verbs 2"
            },
        ]);

        // Fetch the updated list of lessons to include the new Verbs lessons
        const updatedLessons = await Lesson.find();

        // Insert Challenges for the Verbs Lessons
        await Challenge.insertMany([
            {
                lessonId: updatedLessons[2]._id, // Assuming these are the Verbs lessons
                type: "SELECT",
                order: 1,
                question: `What is the Spanish word for "to eat"?`,
            },
            {
                lessonId: updatedLessons[2]._id, // Assuming these are the Verbs lessons
                type: "SELECT",
                order: 2,
                question: `What is the Spanish word for "to drink"?`,
            },
            {
                lessonId: updatedLessons[3]._id, // Assuming these are the Verbs lessons
                type: "SELECT",
                order: 1,
                question: `What is the Spanish word for "to run"?`,
            },
            {
                lessonId: updatedLessons[3]._id, // Assuming these are the Verbs lessons
                type: "SELECT",
                order: 2,
                question: `What is the Spanish word for "to walk"?`,
            },
        ]);

        // Insert Challenge Options for Verbs
        const verbChallenges = await Challenge.find({
            $or: [
                { question: `What is the Spanish word for "to eat"?` },
                { question: `What is the Spanish word for "to drink"?` },
                { question: `What is the Spanish word for "to run"?` },
                { question: `What is the Spanish word for "to walk"?` },
            ]
        });

        await ChallengeOptions.insertMany([
            // Options for "to eat"
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to eat"?`)._id,
                text: "correr",
                correct: false,
                audioSrc: "/es_run.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to eat"?`)._id,
                text: "comer",
                correct: true,
                audioSrc: "/es_eat.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to eat"?`)._id,
                text: "beber",
                correct: false,
                audioSrc: "/es_drink.mp3"
            },

            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to eat"?`)._id,
                text: "caminar",
                correct: false,
                audioSrc: "/es_walk.mp3"
            },
            // Add more incorrect options as needed
            // Options for "to drink"
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to drink"?`)._id,
                text: "beber",
                correct: true,
                audioSrc: "/es_drink.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to drink"?`)._id,
                text: "comer",
                correct: false,
                audioSrc: "/es_eat.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to drink"?`)._id,
                text: "correr",
                correct: false,
                audioSrc: "/es_run.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to drink"?`)._id,
                text: "caminar",
                correct: false,
                audioSrc: "/es_walk.mp3"
            },
            // Add more incorrect options as needed
            // Options for "to run"
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to run"?`)._id,
                text: "correr",
                correct: true,
                audioSrc: "/es_run.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to run"?`)._id,
                text: "beber",
                correct: false,
                audioSrc: "/es_drink.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to run"?`)._id,
                text: "comer",
                correct: false,
                audioSrc: "/es_eat.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to run"?`)._id,
                text: "caminar",
                correct: false,
                audioSrc: "/es_walk.mp3"
            },
            // Add more incorrect options as needed
            // Options for "to walk"
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to walk"?`)._id,
                text: "caminar",
                correct: true,
                audioSrc: "/es_walk.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to walk"?`)._id,
                text: "correr",
                correct: false,
                audioSrc: "/es_run.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to walk"?`)._id,
                text: "beber",
                correct: false,
                audioSrc: "/es_drink.mp3"
            },
            {
                challengeId: verbChallenges.find(challenge => challenge.question === `What is the Spanish word for "to walk"?`)._id,
                text: "comer",
                correct: false,
                audioSrc: "/es_eat.mp3"
            }
            // Add more incorrect options as needed
        ]);

        console.log('Challenge options for verbs added');
        console.log('Courses seeded');
    } catch (e) {
        console.error(e);
        throw new Error('Failed to seed database');
    }
}

main();

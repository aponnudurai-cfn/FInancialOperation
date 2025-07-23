import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

export default function Course() {
    // Assuming you have a client generated from amplify/data/resource.ts
    const client = generateClient<Schema>();
    const createCourse = async () => {
        const course = await client.models.Course.create({ courseName: "Amplify Essentials" });
        console.log("Course created:", course);

        if (!course.data?.id) {
            throw new Error("Course ID is undefined");
        }

        const lessons = [
            { title: "Introduction to Amplify", courseId: course.data.id },
            { title: "Setting up Amplify", courseId: course.data.id },
            { title: "Using Amplify Data", courseId: course.data.id },
        ];

        for (const lesson of lessons) {
            await client.models.Lesson.create({
                title: lesson.title,
                courseId: lesson.courseId
            });
        }


    };
    return (
        <div>
            <h2>Course</h2>
            <button onClick={createCourse}>+ Create new course</button>
        </div>
    );
}

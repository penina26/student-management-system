import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api.js";
import CourseCard from "../components/CourseCard.jsx";
import Button from "../components/Button.jsx";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    async function load() {
        try {
            setErr("");
            setLoading(true);
            const data = await api.getCourses();
            setCourses(data);
        } catch (e) {
            setErr(e.message || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this course? Enrollments will also be removed.");
        if (!ok) return;

        try {
            //  1) Fetch enrollments for this course
            const enrollments = await api.getEnrollmentsByCourse(Number(id));

            //  2) Delete all enrollments first
            await Promise.all(enrollments.map((e) => api.deleteEnrollment(e.id)));

            //  3) Delete the course
            await api.deleteCourse(id);

            //  4) Update UI
            setCourses((prev) => prev.filter((c) => c.id !== id));
        } catch (e) {
            alert(e.message || "Failed to delete course and enrollments");
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Courses</h1>
                <Link to="/courses/new">
                    <Button>Add Course</Button>
                </Link>
            </div>

            {loading && <p className="text-gray-600">Loading...</p>}
            {err && <p className="text-red-600">{err}</p>}

            {!loading && !err && courses.length === 0 && (
                <p className="text-gray-600">No courses found. Add one!</p>
            )}

            <div className="grid gap-3">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

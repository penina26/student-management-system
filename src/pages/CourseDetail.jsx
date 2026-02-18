// src/pages/CourseDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import EnrollmentForm from "../components/EnrollmentForm.jsx";
import EnrollmentTable from "../components/EnrollmentTable.jsx";
import { api } from "../services/api.js";

const GRADES = ["", "A", "B", "C", "D", "E", "F", "I"]; // I = Incomplete

export default function CourseDetail() {
    const { id } = useParams();

    /**
     * ✅ CHANGE: Treat courseId as STRING.
     * This supports ids like "c1e9" (json-server can generate these).
     */
    const courseId = String(id);

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    /**
     * ✅ CHANGE: Map students by STRING id for quick lookup.
     * (No Number() here.)
     */
    const studentsById = useMemo(() => {
        const map = new Map();
        students.forEach((s) => map.set(String(s.id), s));
        return map;
    }, [students]);

    async function load() {
        try {
            setErr("");
            setLoading(true);

            /**
             * ✅ CHANGE: API calls use string ids
             */
            const [courseData, studentsData, enrollmentsData] = await Promise.all([
                api.getCourse(courseId),
                api.getStudents(),
                api.getEnrollmentsByCourse(courseId),
            ]);

            /**
             * ✅ CHANGE: Normalize enrollment foreign keys to STRINGS
             * so table + duplicate checks work.
             */
            const normalizedEnrollments = enrollmentsData.map((e) => ({
                ...e,
                studentId: String(e.studentId),
                courseId: String(e.courseId),
            }));

            setCourse(courseData);
            setStudents(studentsData);
            setEnrollments(normalizedEnrollments);
        } catch (e) {
            setErr(e.message || "Failed to load course details");
        } finally {
            setLoading(false);
        }
    }

    /**
     * ✅ CHANGE: dependency is string courseId
     */
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    async function handleRemoveEnrollment(enrollmentId) {
        const ok = window.confirm("Remove this student from the course?");
        if (!ok) return;

        try {
            await api.deleteEnrollment(enrollmentId);
            setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
        } catch (e) {
            alert(e.message || "Failed to remove enrollment");
        }
    }

    async function handleGradeChange(enrollment, grade) {
        try {
            /**
             * ✅ CHANGE: keep studentId/courseId as STRINGS in update payload
             */
            await api.updateEnrollment(enrollment.id, {
                id: enrollment.id,
                studentId: String(enrollment.studentId),
                courseId: String(enrollment.courseId),
                grade: grade || "",
            });

            setEnrollments((prev) =>
                prev.map((e) => (e.id === enrollment.id ? { ...e, grade } : e))
            );
        } catch (e) {
            alert(e.message || "Failed to update grade");
        }
    }

    if (loading) return <p className="text-gray-600">Loading...</p>;

    if (err && !course) {
        return (
            <div className="space-y-3">
                <p className="text-red-600">{err}</p>
                <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="space-y-3">
                <p className="text-gray-600">Course not found.</p>
                <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">{course.title}</h1>
                    <p className="text-sm text-gray-600">
                        Code: <span className="font-medium">{course.code}</span> • Credits:{" "}
                        <span className="font-medium">{course.credits}</span>
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link to="/courses">
                        <Button className="bg-gray-800">Back</Button>
                    </Link>
                    <Link to={`/courses/${course.id}/edit`}>
                        <Button>Edit Course</Button>
                    </Link>
                </div>
            </div>

            {err && <p className="text-red-600">{err}</p>}

            {/* ✅ EnrollmentForm already updated to send string ids */}
            <EnrollmentForm
                mode="course"
                title="Enroll a Student"
                courseId={courseId}
                students={students}
                enrollments={enrollments}
                onEnroll={async (payload) => {
                    /**
                     * ✅ CHANGE: do NOT Number() anything.
                     * Payload studentId/courseId should already be strings.
                     */
                    const newEnrollment = await api.addEnrollment(payload);

                    const normalized = {
                        ...newEnrollment,
                        studentId: String(newEnrollment.studentId),
                        courseId: String(newEnrollment.courseId),
                    };

                    setEnrollments((prev) => [...prev, normalized]);
                }}
            />

            <div className="border rounded-2xl p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-3">
                    Enrolled Students ({enrollments.length})
                </h2>

                <EnrollmentTable
                    mode="course"
                    enrollments={enrollments}
                    studentsById={studentsById}
                    onGradeChange={handleGradeChange}
                    onRemove={handleRemoveEnrollment}
                />
            </div>
        </div>
    );
}

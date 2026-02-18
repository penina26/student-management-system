import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import EnrollmentForm from "../components/EnrollmentForm.jsx";
import EnrollmentTable from "../components/EnrollmentTable.jsx";
import { api } from "../services/api.js";

export default function StudentDetail() {
    const { id } = useParams();

    /**
     * Treat studentId as STRING
     
     */
    const studentId = String(id);

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    /**
     * ✅ CHANGE: Map courses by STRING id (no Number())
     */
    const coursesById = useMemo(() => {
        const map = new Map();
        courses.forEach((c) => map.set(String(c.id), c));
        return map;
    }, [courses]);

    async function load() {
        try {
            setErr("");
            setLoading(true);

            /**
             * ✅ CHANGE: API calls use string ids
             */
            const [studentData, coursesData, enrData] = await Promise.all([
                api.getStudent(studentId),
                api.getCourses(),
                api.getEnrollmentsByStudent(studentId),
            ]);

            /**
             * ✅ CHANGE: Normalize enrollment foreign keys to STRINGS
             * (matches db.json students.id and courses.id)
             */
            const normalized = enrData.map((e) => ({
                ...e,
                studentId: String(e.studentId),
                courseId: String(e.courseId),
            }));

            setStudent(studentData);
            setCourses(coursesData);
            setEnrollments(normalized);
        } catch (e) {
            setErr(e.message || "Failed to load student details");
        } finally {
            setLoading(false);
        }
    }

    /**
     * ✅ CHANGE: dependency is string studentId
     */
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentId]);

    async function handleRemoveEnrollment(enrollmentId) {
        const ok = window.confirm("Remove this course from the student?");
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
             * ✅ CHANGE: keep studentId/courseId as STRINGS
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

    if (err && !student) {
        return (
            <div className="space-y-3">
                <p className="text-red-600">{err}</p>
                <Button onClick={() => navigate("/students")}>Back to Students</Button>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="space-y-3">
                <p className="text-gray-600">Student not found.</p>
                <Button onClick={() => navigate("/students")}>Back to Students</Button>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">{student.name}</h1>
                    <p className="text-sm text-gray-600">
                        Reg No: <span className="font-medium">{student.regNo}</span> • Email:{" "}
                        <span className="font-medium">{student.email}</span> • Year:{" "}
                        <span className="font-medium">{student.year}</span>
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link to="/students">
                        <Button className="bg-gray-800">Back</Button>
                    </Link>
                    <Link to={`/students/${student.id}/edit`}>
                        <Button>Edit Student</Button>
                    </Link>
                </div>
            </div>

            {err && <p className="text-red-600">{err}</p>}

            {/* ✅ EnrollmentForm already updated to send string ids */}
            <EnrollmentForm
                mode="student"
                title="Enroll to a Course"
                studentId={studentId}
                courses={courses}
                enrollments={enrollments}
                onEnroll={async (payload) => {
                    const newEnrollment = await api.addEnrollment(payload);

                    // Normalize new enrollment too
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
                    Enrolled Courses ({enrollments.length})
                </h2>

                <EnrollmentTable
                    mode="student"
                    enrollments={enrollments}
                    coursesById={coursesById}
                    onGradeChange={handleGradeChange}
                    onRemove={handleRemoveEnrollment}
                />
            </div>
        </div>
    );
}

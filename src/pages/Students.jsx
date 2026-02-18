import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api.js";
import StudentCard from "../components/StudentCard.jsx";
import Button from "../components/Button.jsx";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    async function load() {
        try {
            setErr("");
            setLoading(true);
            const data = await api.getStudents();
            setStudents(data);
        } catch (e) {
            setErr(e.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this student? Their enrollments will also be removed.");
        if (!ok) return;

        try {
            // 1) Fetch enrollments for this student
            const enrollments = await api.getEnrollmentsByStudent(Number(id));

            //  2) Delete all enrollments (in parallel for speed)
            await Promise.all(enrollments.map((e) => api.deleteEnrollment(e.id)));

            //  3) Delete the student
            await api.deleteStudent(id);

            //  4) Update UI
            setStudents((prev) => prev.filter((s) => s.id !== id));
        } catch (e) {
            alert(e.message || "Failed to delete student and enrollments");
        }
    }


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Students</h1>
                <Link to="/students/new">
                    <Button>Add Student</Button>
                </Link>
            </div>

            {loading && <p className="text-gray-600">Loading...</p>}
            {err && <p className="text-red-600">{err}</p>}

            {!loading && !err && students.length === 0 && (
                <p className="text-gray-600">No students found. Add one!</p>
            )}

            <div className="grid gap-3">
                {students.map((student) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

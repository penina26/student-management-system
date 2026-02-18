import { useMemo, useState } from "react";
import Button from "./Button.jsx";

const GRADES = ["", "A", "B", "C", "D", "E", "F", "I"]; // I = Incomplete

/**
 * Reusable enrollment form.
 *
 * mode="student": You are on StudentDetail -> pick a course
 * mode="course":  You are on CourseDetail  -> pick a student
 *
 * We treat ALL ids as STRINGS.
 * JSON Server may generate string ids (e.g. "c1e9")
 */
export default function EnrollmentForm({
    mode, // "student" | "course"
    students = [],
    courses = [],
    enrollments = [], // existing enrollments to prevent duplicates
    studentId, // required when mode="student"
    courseId, // required when mode="course"
    onEnroll, // async function(payload)
    title = "Enroll",
}) {
    const [selectedId, setSelectedId] = useState("");
    const [grade, setGrade] = useState("");
    const [err, setErr] = useState("");
    const [saving, setSaving] = useState(false);

    // normalize any id into a string
    const toId = (v) => String(v ?? "").trim();

    /**
     * Build sets using STRING ids 
     * This prevents duplicates reliably ("1" !== 1, and "c1e9" becomes NaN if Number() is used).
     */
    const enrolledStudentIds = useMemo(
        () => new Set(enrollments.map((e) => toId(e.studentId))),
        [enrollments]
    );

    const enrolledCourseIds = useMemo(
        () => new Set(enrollments.map((e) => toId(e.courseId))),
        [enrollments]
    );

    /**
     * Options depend on mode, and comparisons use STRING ids.
     */
    const options = useMemo(() => {
        if (mode === "course") {
            // Pick students not already enrolled in THIS course
            return students.filter((s) => !enrolledStudentIds.has(toId(s.id)));
        }

        // mode === "student"
        // Pick courses not already enrolled by THIS student
        return courses.filter((c) => !enrolledCourseIds.has(toId(c.id)));
    }, [mode, students, courses, enrolledStudentIds, enrolledCourseIds]);

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");

        if (!selectedId) {
            setErr(`Please select a ${mode === "course" ? "student" : "course"}.`);
            return;
        }

        /**
         * Enrollment payload MUST use string ids to match:
         * - students.id (string)
         * - courses.id  (string)
         * - enrollments.studentId/courseId (string)
         */
        const payload =
            mode === "course"
                ? {
                    studentId: toId(selectedId),
                    courseId: toId(courseId),
                    grade: grade || "",
                }
                : {
                    studentId: toId(studentId),
                    courseId: toId(selectedId),
                    grade: grade || "",
                };

        try {
            setSaving(true);
            await onEnroll(payload);
            setSelectedId("");
            setGrade("");
        } catch (e2) {
            setErr(e2?.message || "Failed to enroll.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="border rounded-2xl p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-3">{title}</h2>

            {err && <p className="text-red-600 mb-2">{err}</p>}

            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">
                        {mode === "course" ? "Student" : "Course"}
                    </label>

                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="w-full border rounded-xl p-2"
                    >
                        <option value="">
                            -- Select {mode === "course" ? "student" : "course"} --
                        </option>

                        {mode === "course"
                            ? options.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.regNo})
                                </option>
                            ))
                            : options.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title} ({c.code})
                                </option>
                            ))}
                    </select>

                    {options.length === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                            No available {mode === "course" ? "students" : "courses"} to enroll.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Initial Grade</label>
                    <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full border rounded-xl p-2"
                    >
                        {GRADES.map((g) => (
                            <option key={g} value={g}>
                                {g === "" ? "Not set" : g}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={saving || options.length === 0}
                    >
                        {saving ? "Enrolling..." : "Enroll"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

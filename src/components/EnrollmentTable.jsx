import Button from "./Button.jsx";

const GRADES = ["", "A", "B", "C", "D", "E", "F", "I"]; // I = Incomplete

/**
 * mode="student": You are on StudentDetail -> table shows COURSES
 * mode="course":  You are on CourseDetail  -> table shows STUDENTS
 *
 * IMPORTANT: ids are treated as STRINGS.
 * So maps should be Map<string, student> / Map<string, course>.
 */
export default function EnrollmentTable({
    mode, // "student" | "course"
    enrollments = [],
    studentsById, // Map<string, student> (required for mode="course")
    coursesById,  // Map<string, course>  (required for mode="student")
    onGradeChange,
    onRemove,
}) {
    // normalize any id into a string
    const toId = (v) => String(v ?? "").trim();

    if (!enrollments.length) {
        return <p className="text-gray-600">No enrollments yet.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left border-b">
                        {mode === "course" ? (
                            <>
                                <th className="py-2">Student</th>
                                <th className="py-2">Reg No</th>
                                <th className="py-2">Email</th>
                            </>
                        ) : (
                            <>
                                <th className="py-2">Course</th>
                                <th className="py-2">Code</th>
                                <th className="py-2">Credits</th>
                            </>
                        )}
                        <th className="py-2">Grade</th>
                        <th className="py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {enrollments.map((enr) => {

                        const student = studentsById?.get(toId(enr.studentId));
                        const course = coursesById?.get(toId(enr.courseId));

                        return (
                            <tr key={enr.id} className="border-b last:border-b-0">
                                {mode === "course" ? (
                                    <>
                                        <td className="py-2">{student?.name || "Unknown student"}</td>
                                        <td className="py-2">{student?.regNo || "-"}</td>
                                        <td className="py-2">{student?.email || "-"}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-2">{course?.title || "Unknown course"}</td>
                                        <td className="py-2">{course?.code || "-"}</td>
                                        <td className="py-2">{course?.credits ?? "-"}</td>
                                    </>
                                )}

                                <td className="py-2">
                                    <select
                                        value={enr.grade || ""}
                                        onChange={(e) => onGradeChange(enr, e.target.value)}
                                        className="border rounded-lg p-1"
                                    >
                                        {GRADES.map((g) => (
                                            <option key={g} value={g}>
                                                {g === "" ? "Not set" : g}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="py-2">
                                    <Button
                                        type="button"
                                        className="bg-red-600"
                                        onClick={() => onRemove(enr.id)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

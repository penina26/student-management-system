// src/services/api.js
const BASE = "http://localhost:3001";

/**
 * Generic request helper for JSON Server.
 * - Adds JSON headers
 * - Throws on non-2xx responses
 * - Returns JSON (or null for 204)
 */
async function req(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });

    if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
    return res.status === 204 ? null : res.json();
}

/**
 * Ensure we always treat ids as strings.
 * (Works for "1", 1, "c1e9", etc.)
 */
function toId(value) {
    return String(value ?? "").trim();
}

/**
 * Remove `id` before POST so JSON Server generates it.
 * (If you send id, JSON Server will keep your value and you can get mixed types.)
 */
function stripId(data) {
    if (!data || typeof data !== "object") return data;
    const { id, ...payload } = data;
    return payload;
}

export const api = {
    // -------------------------
    // STUDENTS
    // -------------------------

    getStudents: () => req("/students"),

    // ✅ id kept as string
    getStudent: (id) => req(`/students/${toId(id)}`),

    // ✅ don't send id on create
    addStudent: (data) =>
        req("/students", {
            method: "POST",
            body: JSON.stringify(stripId(data)),
        }),

    /**
     * JSON Server PUT expects full object including id.
     * ✅ Keep id as string in body to match db.json
     */
    updateStudent: (id, data) =>
        req(`/students/${toId(id)}`, {
            method: "PUT",
            body: JSON.stringify({ id: toId(id), ...stripId(data) }),
        }),

    deleteStudent: (id) => req(`/students/${toId(id)}`, { method: "DELETE" }),

    // -------------------------
    // COURSES
    // -------------------------

    getCourses: () => req("/courses"),
    getCourse: (id) => req(`/courses/${toId(id)}`),

    addCourse: (data) =>
        req("/courses", {
            method: "POST",
            body: JSON.stringify(stripId(data)),
        }),

    updateCourse: (id, data) =>
        req(`/courses/${toId(id)}`, {
            method: "PUT",
            body: JSON.stringify({ id: toId(id), ...stripId(data) }),
        }),

    deleteCourse: (id) => req(`/courses/${toId(id)}`, { method: "DELETE" }),

    // -------------------------
    // ENROLLMENTS
    // -------------------------

    /**
     * IMPORTANT:
     * Your enrollments MUST use string studentId/courseId
     * to match students.id and courses.id.
     */
    getEnrollmentsByCourse: (courseId) =>
        req(`/enrollments?courseId=${toId(courseId)}`),

    getEnrollmentsByStudent: (studentId) =>
        req(`/enrollments?studentId=${toId(studentId)}`),

    // ✅ don't send enrollment id; ensure FK ids are strings
    addEnrollment: (data) => {
        const payload = stripId(data);
        return req("/enrollments", {
            method: "POST",
            body: JSON.stringify({
                ...payload,
                studentId: toId(payload.studentId),
                courseId: toId(payload.courseId),
                grade: payload.grade || "",
            }),
        });
    },

    // ✅ PUT expects full object including id; keep everything as strings
    updateEnrollment: (id, data) => {
        const payload = stripId(data);
        return req(`/enrollments/${toId(id)}`, {
            method: "PUT",
            body: JSON.stringify({
                id: toId(id),
                studentId: toId(payload.studentId),
                courseId: toId(payload.courseId),
                grade: payload.grade || "",
            }),
        });
    },

    deleteEnrollment: (id) => req(`/enrollments/${toId(id)}`, { method: "DELETE" }),
};

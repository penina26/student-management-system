import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import Button from "../components/Button.jsx";

export default function AddCourse() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        code: "",
        title: "",
        credits: 3,
    });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        async function loadCourse() {
            if (!isEdit) return;
            try {
                setErr("");
                setLoading(true);
                const course = await api.getCourse(id);
                setForm({
                    code: course.code || "",
                    title: course.title || "",
                    credits: course.credits ?? 3,
                });
            } catch (e) {
                setErr(e.message || "Failed to load course");
            } finally {
                setLoading(false);
            }
        }
        loadCourse();
    }, [id, isEdit]);

    function updateField(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "credits" ? Number(value) : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.code.trim() || !form.title.trim()) {
            setErr("Course code and title are required.");
            return;
        }

        try {
            setErr("");
            setLoading(true);

            if (isEdit) {
                await api.updateCourse(id, form);
            } else {
                await api.addCourse(form);
            }

            navigate("/courses");
        } catch (e) {
            setErr(e.message || "Failed to save course");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl space-y-4">
            <h1 className="text-2xl font-bold">
                {isEdit ? "Edit Course" : "Add Course"}
            </h1>

            {err && <p className="text-red-600">{err}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium">Course Code</label>
                    <input
                        name="code"
                        value={form.code}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                        placeholder="DS101"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Course Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                        placeholder="Introduction to Data Science"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Credits</label>
                    <select
                        name="credits"
                        value={form.credits}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>

                    <Button
                        type="button"
                        className="bg-gray-700"
                        onClick={() => navigate("/courses")}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

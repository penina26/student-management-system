import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import Button from "../components/Button.jsx";

export default function AddStudent() {
    const { id } = useParams(); // if present => edit mode
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        regNo: "",
        name: "",
        email: "",
        year: 1,
    });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        async function loadStudent() {
            if (!isEdit) return;
            try {
                setErr("");
                setLoading(true);
                const student = await api.getStudent(id);
                setForm({
                    regNo: student.regNo || "",
                    name: student.name || "",
                    email: student.email || "",
                    year: student.year ?? 1,
                });
            } catch (e) {
                setErr(e.message || "Failed to load student");
            } finally {
                setLoading(false);
            }
        }
        loadStudent();
    }, [id, isEdit]);

    function updateField(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "year" ? Number(value) : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.regNo.trim() || !form.name.trim() || !form.email.trim()) {
            setErr("Reg No, Name and Email are required.");
            return;
        }

        try {
            setErr("");
            setLoading(true);

            if (isEdit) {
                await api.updateStudent(id, form);
            } else {
                await api.addStudent(form);
            }

            navigate("/students");
        } catch (e) {
            setErr(e.message || "Failed to save student");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl space-y-4">
            <h1 className="text-2xl font-bold">
                {isEdit ? "Edit Student" : "Add Student"}
            </h1>

            {err && <p className="text-red-600">{err}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium">Reg No</label>
                    <input
                        name="regNo"
                        value={form.regNo}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                        placeholder="SCMS/003"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                        placeholder="jane@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Year</label>
                    <select
                        name="year"
                        value={form.year}
                        onChange={updateField}
                        className="w-full border rounded-xl p-2"
                    >
                        <option value={1}>Year 1</option>
                        <option value={2}>Year 2</option>
                        <option value={3}>Year 3</option>
                        <option value={4}>Year 4</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>

                    <Button
                        type="button"
                        className="bg-gray-700"
                        onClick={() => navigate("/students")}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

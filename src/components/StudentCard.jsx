import { Link } from "react-router-dom";
import Button from "./Button.jsx";

export default function StudentCard({ student, onDelete }) {
    return (
        <div className="border rounded-2xl p-4 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
                    <p className="text-sm text-gray-600">Email: {student.email}</p>
                    <p className="text-sm text-gray-600">Year: {student.year}</p>
                </div>

                <div className="flex gap-2">

                    <Link to={`/students/${student.id}`}>
                        <Button className="bg-black">View</Button>
                    </Link>

                    <Link to={`/students/${student.id}/edit`}>
                        <Button className="bg-gray-800">Edit</Button>
                    </Link>

                    <Button
                        className="bg-red-600"
                        onClick={() => onDelete(student.id)}
                        type="button"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

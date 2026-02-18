import { Link } from "react-router-dom";
import Button from "./Button.jsx";

export default function CourseCard({ course, onDelete }) {
    return (
        <div className="border rounded-2xl p-4 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">Code: {course.code}</p>
                    <p className="text-sm text-gray-600">Credits: {course.credits}</p>
                </div>

                <div className="flex gap-2">
                    <Link to={`/courses/${course.id}`}>
                        <Button className="bg-black">View</Button>
                    </Link>

                    <Link to={`/courses/${course.id}/edit`}>
                        <Button className="bg-gray-800">Edit</Button>
                    </Link>

                    <Button
                        className="bg-red-600"
                        onClick={() => onDelete(course.id)}
                        type="button"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

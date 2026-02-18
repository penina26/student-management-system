import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

// React Icons (FontAwesome)
import {
    FaUsers,
    FaBookOpen,
    FaGraduationCap,
    FaTachometerAlt,
    FaArrowRight,
    FaDatabase,
} from "react-icons/fa";

export default function Home() {
    return (
        <div className="space-y-10">
            {/* =========================
          HERO SECTION (Top banner)
         ========================= */}
            <section className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Left side: title + description + action buttons */}
                    <div className="space-y-3">
                        {/* Small label with an icon */}
                        <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <FaTachometerAlt size={30} />
                            Student Course Management System (SCMS)
                        </p>

                        {/* Main headline */}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            Manage students, courses, and enrollments in one place.
                        </h1>

                        {/* Supporting description */}
                        <p className="text-gray-600 max-w-2xl">
                            Register students and courses, enroll learners, assign grades, and
                            keep records consistent without spreadsheets or manual paperwork.
                        </p>

                        {/* Call-to-action buttons (go to main sections) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Link to="/students">
                                <Button>
                                    <span className="inline-flex items-center gap-2">
                                        <FaUsers size={16} />
                                        View Students
                                        <FaArrowRight size={16} />
                                    </span>
                                </Button>
                            </Link>

                            <Link to="/courses">
                                <Button className="bg-gray-800">
                                    <span className="inline-flex items-center gap-2">
                                        <FaBookOpen size={16} />
                                        View Courses
                                        <FaArrowRight size={16} />
                                    </span>
                                </Button>
                            </Link>

                            <Link to="/about">
                                <Button className="bg-black">
                                    <span className="inline-flex items-center gap-2">
                                        <FaGraduationCap size={16} />
                                        About SCMS
                                        <FaArrowRight size={16} />
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right side: quick feature cards (mini summary cards) */}
                    <div className="grid grid-cols-2 gap-3 w-full md:w-[360px]">
                        {/* Card 1 */}
                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-2">
                                <FaUsers size={16} />
                                <p className="font-semibold">Student Records</p>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Create, update, view & delete students.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-2">
                                <FaBookOpen size={16} />
                                <p className="font-semibold">Course Catalog</p>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Manage courses and credits easily.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-2">
                                <FaGraduationCap size={16} />
                                <p className="font-semibold">Enrollments</p>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Enroll students and track grades.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="rounded-2xl border p-4">
                            <div className="flex items-center gap-2">
                                <FaDatabase size={16} />
                                <p className="font-semibold">React + JSON Server</p>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Fast demo backend for development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
          FEATURE SECTION (3 cards)
         ========================= */}
            <section className="grid gap-4 md:grid-cols-3">
                {/* Students feature card */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaUsers size={20} />
                        <h2 className="text-lg font-semibold">Students</h2>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                        Add student profiles with registration number, year of study, and
                        contact information.
                    </p>

                    {/* Quick shortcut to add student */}
                    <div className="pt-4">
                        <Link to="/students/new">
                            <Button className="bg-black">
                                <span className="inline-flex items-center gap-2">
                                    <FaUsers size={16} />
                                    Add Student
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Courses feature card */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaBookOpen size={20} />
                        <h2 className="text-lg font-semibold">Courses</h2>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                        Create course units with code, title, and credits. Edit or remove
                        outdated courses anytime.
                    </p>

                    {/* Quick shortcut to add course */}
                    <div className="pt-4">
                        <Link to="/courses/new">
                            <Button className="bg-gray-800">
                                <span className="inline-flex items-center gap-2">
                                    <FaBookOpen size={16} />
                                    Add Course
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Enrollment feature card */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaGraduationCap size={20} />
                        <h2 className="text-lg font-semibold">Enroll & Grade</h2>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                        Enroll students into courses and assign grades. View everything from
                        student or course pages.
                    </p>

                    {/* Shortcut to start enrolling */}
                    <div className="pt-4">
                        <Link to="/students">
                            <Button>
                                <span className="inline-flex items-center gap-2">
                                    <FaGraduationCap size={16} />
                                    Start Enrolling
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";

// Icons (react-icons)
import {
    FaGraduationCap,
    FaUsers,
    FaBookOpen,
    FaClipboardList,
    FaBullseye,
    FaCode,
    FaRocket,
    FaExclamationTriangle,
    FaLightbulb,
    FaPenNib
} from "react-icons/fa";

export default function About() {
    return (
        <div className="space-y-8">
            {/* Header section  */}
            <section className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm space-y-3">
                {/* Label + icon */}
                <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <FaGraduationCap className="text-black" size={16} />
                    About the Project
                </p>

                {/* Main title */}
                <h1 className="text-3xl md:text-4xl font-bold">
                    Student Management System (SCMS)
                </h1>

                {/* Project description */}
                <p className="text-gray-600 max-w-3xl">
                    SCMS is a Student Course Management System designed to help institutions
                    store student records, manage courses, and handle enrollments with fewer
                    errors and less manual paperwork.
                </p>

                {/* Quick navigation buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <Link to="/students">
                        <Button>
                            <span className="inline-flex items-center gap-2">
                                <FaUsers size={16} />
                                Students
                            </span>
                        </Button>
                    </Link>

                    <Link to="/courses">
                        <Button className="bg-gray-800">
                            <span className="inline-flex items-center gap-2">
                                <FaBookOpen size={16} />
                                Courses
                            </span>
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Problem + Solution */}
            <section className="grid gap-4 md:grid-cols-2">
                {/* Problem card */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaExclamationTriangle size={20} />
                        <h2 className="text-lg font-semibold">Problem Statement</h2>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                        Many institutions struggle with manual record keeping, leading to:
                    </p>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>Lost student/course information</li>
                        <li>Duplicate records and inconsistencies</li>
                        <li>Slow access to academic records</li>
                        <li>More paperwork and higher error rates</li>
                    </ul>
                </div>

                {/* Solution card */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaLightbulb size={20} />
                        <h2 className="text-lg font-semibold">Solution Statement</h2>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                        SCMS provides a structured way to register, manage, and retrieve student
                        and course data consistently and easily.
                    </p>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>Centralized student and course records</li>
                        <li>Enrollment tracking from both sides</li>
                        <li>Simple grade recording</li>
                        <li>Reduced manual work and fewer errors</li>
                    </ul>
                </div>
            </section>

            {/* Objectives + Scope  */}
            <section className="grid gap-4 md:grid-cols-2">
                {/* Objectives */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaBullseye size={20} />
                        <h2 className="text-lg font-semibold">Objectives</h2>
                    </div>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>Maintain student records</li>
                        <li>Manage course details</li>
                        <li>Handle course enrollment</li>
                        <li>Reduce manual paperwork</li>
                    </ul>
                </div>

                {/* Scope */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaClipboardList size={20} />
                        <h2 className="text-lg font-semibold">Scope</h2>
                    </div>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>Create students and courses registration forms</li>
                        <li>Read courses and students information</li>
                        <li>Update courses and student information</li>
                        <li>Delete student or course information</li>
                        <li>Deploy to a hosting service future</li>
                    </ul>
                </div>
            </section>

            {/*  Tech + Future Plans */}
            <section className="grid gap-4 md:grid-cols-2">
                {/* Tech stack */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaCode size={20} />
                        <h2 className="text-lg font-semibold">Technologies Used</h2>
                    </div>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>React (UI)</li>
                        <li>React Router (navigation)</li>
                        <li>Tailwind CSS (styling)</li>
                        <li>JSON Server (mock backend)</li>
                    </ul>
                </div>

                {/* Future plans */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FaRocket size={20} />
                        <h2 className="text-lg font-semibold">Future Plans</h2>
                    </div>

                    <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                        <li>Connect to a commercial database (PostgreSQL/MySQL)</li>
                        <li>Add a proper backend API (Node/Express or Django/DRF)</li>
                        <li>Track student performance and transcripts</li>
                        <li>User authentication (admin vs student portal)</li>
                    </ul>
                </div>
            </section>

            {/* Authors section */}
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <FaPenNib className="text-gray-700" size={18} />
                    Authors
                </h2>

                <div className="mt-3">
                    <p className="text-sm text-gray-600">
                        <ul>
                            <li>Penina Wanyama</li>
                            <li>Samuel Wanjau</li>
                            <li>Sharon Ouko</li>
                            <li>Sylvana Wanjiru</li>
                            <li>Robert Mmasi</li>
                        </ul>
                    </p>
                </div>
            </section>

        </div>
    );
}

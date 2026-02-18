import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
    "px-3 py-2 rounded-lg " + (isActive ? "bg-black text-white" : "hover:bg-gray-100");

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <div className="font-bold">SCMS</div>
            <div className="flex gap-2">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/about" className={linkClass}>About</NavLink>
                <NavLink to="/students" className={linkClass}>Students</NavLink>
                <NavLink to="/courses" className={linkClass}>Courses</NavLink>
            </div>
        </nav>
    );
}

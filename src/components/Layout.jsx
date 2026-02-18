import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-5xl w-full mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

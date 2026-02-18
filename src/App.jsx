import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Students from "./pages/Students.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import Courses from "./pages/Courses.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/new" element={<AddStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/students/:id/edit" element={<AddStudent />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/new" element={<AddCourse />} />
        <Route path="/courses/:id/edit" element={<AddCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Route>
    </Routes>
  );
}


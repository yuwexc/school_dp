import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import StudentLayout from "./layouts/StudentLayout";
import Courses from "./views/Courses";
import Home from "./views/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import MyCourses from "./views/MyCourses";
import CourseItem from "./views/CourseItem";
import Lesson from "./views/Lesson";
import CourseTeacherView from "./views/CourseTeacherView";
import EditCourseProperty from "./views/EditCourseProperty";
import CreateLessonView from "./views/CreateLessonView";
import LessonLayout from "./layouts/LessonLayout";
import CheckLessonView from "./views/CheckLessonView";
import CheckLessonStudentAnswer from "./views/CheckLessonStudentAnswer";
import CreateCourseView from "./views/CreateCourseView";
import AdminDashboard from "./views/Admin";
import Dictionary from "./views/Dictionary";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/courses', element: <Courses /> },
            { path: '/courses/:id', element: <CourseItem /> },
            { path: '/dictionary', element: <Dictionary /> },
            { path: '/*', element: <Navigate to={'/'} /> },
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/sign-up', element: <SignUp /> },
        ]
    },
    {
        path: '/',
        element: <StudentLayout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-courses', element: <MyCourses /> },
            { path: '/my-courses/:id', element: <CourseItem /> },
            { path: '/settings', element: <Settings /> }
        ]
    },
    {
        path: '/',
        element: <StudentLayout />,
        children: [
            { path: '/teacher/courses/:id', element: <CourseTeacherView /> },
            { path: '/teacher/courses/:id/edit/:property', element: <EditCourseProperty /> },
            { path: '/teacher/courses/create', element: <CreateCourseView /> },
            { path: '/teacher/courses/:id/create-lesson', element: <CreateLessonView /> },
            { path: '/lessons/:id/unmarked', element: <CheckLessonView /> },
            { path: '/user/:user/completed-lessons/:id/check', element: <CheckLessonStudentAnswer /> },
        ]
    },
    {
        path: '/',
        element: <LessonLayout />,
        children: [
            { path: '/lessons/:id', element: <Lesson /> }
        ]
    },
    {
        path: '/admin',
        element: <AdminDashboard />
    }
])

export default router;
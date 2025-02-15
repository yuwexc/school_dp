import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import StudentLayout from "./layouts/StudentLayout";
import Courses from "./views/Courses";
import Topics from "./views/Topics";
import Home from "./views/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import MyCourses from "./views/MyCourses";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/courses', element: <Courses /> },
            { path: '/courses/:id', element: <Courses /> },
            { path: '/topics', element: <Topics /> },
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
            { path: '/', element: <Home /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-courses', element: <MyCourses /> },
            { path: '/my-courses/:id', element: <MyCourses /> },
            { path: '/settings', element: <Settings /> },
        ]
    }
])

export default router;
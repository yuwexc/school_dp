import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import StudentLayout from "./layouts/StudentLayout";
import Courses from "./views/Courses";
import Profile from "./views/Profile";
import Topics from "./views/Topics";
import Main from "./views/Main";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: '/', element: <Main /> },
            { path: '/courses', element: <Courses /> },
            { path: '/topics', element: <Topics /> }
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
            { path: '/', element: <Main /> },
            { path: '/profile', element: <Profile /> }
        ]
    }
])

export default router;
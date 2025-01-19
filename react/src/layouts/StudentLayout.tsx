import { Navigate, Outlet } from "react-router-dom";

const StudentLayout = () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <main>
                Student
                <Outlet />
            </main>
            <footer>
                footer
            </footer>
        </>
    )
}

export default StudentLayout;
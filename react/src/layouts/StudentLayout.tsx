import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const StudentLayout = () => {

    const { token } = useStateContext();

    if (token == '') {
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
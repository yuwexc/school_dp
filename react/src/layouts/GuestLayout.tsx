import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const GuestLayout = () => {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                footer
            </footer>
        </>
    )
}

export default GuestLayout;
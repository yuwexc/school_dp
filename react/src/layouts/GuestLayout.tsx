import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const GuestLayout = () => {

    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <footer>
                footer
            </footer>
        </>
    )
}

export default GuestLayout;

const Main = styled.main`
    padding-top: calc(8dvh + 20px);
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
`
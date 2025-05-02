import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import Footer from "../components/Footer";

const GuestLayout = () => {

    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    )
}

export default GuestLayout;

const Main = styled.div`
    padding-top: calc(8dvh + 20px);
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;

    @media (width <= 768px) {
        padding-top: 82px;
    }
`
import { Outlet } from "react-router-dom"
import styled from "styled-components";

const AuthLayout = () => {
    return (
        <>
            <Main>
                <Outlet />
            </Main>
        </>
    )
}

export default AuthLayout;

const Main = styled.main`
    flex: 1 0 auto;
    display: flex;
`
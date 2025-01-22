import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import AsideMenu from "../components/AsideMenu";

const StudentLayout = () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <StyledStudentLayout>
                <AsideMenu />
                <StyledMain>
                    <Outlet />
                </StyledMain>
            </StyledStudentLayout>
        </>
    )
}

export default StudentLayout;

const StyledMain = styled.main`
    padding: 24px;
`

const StyledStudentLayout = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #ebebeb;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`
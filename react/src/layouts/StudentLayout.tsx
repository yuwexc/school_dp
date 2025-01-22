import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import AsideMenu from "../components/AsideMenu";
import DashboardHeader from "../components/DashboardHeader";

const StudentLayout = () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <StyledStudentLayout>
                <AsideMenu />
                <Dashboard>
                    <DashboardHeader />
                    <Outlet />
                </Dashboard>
            </StyledStudentLayout>
        </>
    )
}

export default StudentLayout;

const Dashboard = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const StyledStudentLayout = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #ebebeb;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`
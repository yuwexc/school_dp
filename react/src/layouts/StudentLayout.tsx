import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import AsideMenu from "../components/AsideMenu";
import DashboardHeader from "../components/DashboardHeader";
import { useState } from "react";

const StudentLayout = () => {

    const [isHovered, setIsHovered] = useState<boolean>(false);

    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <StyledStudentLayout>
                <AsideMenu setIsHovered={setIsHovered} />
                <Dashboard $isHovered={isHovered}>
                    <DashboardHeader />
                    <Outlet />
                </Dashboard>
            </StyledStudentLayout>
        </>
    )
}

export default StudentLayout;

export const Dashboard = styled.div<{ $isHovered: boolean }>`
    margin-left: ${props => props.$isHovered ? '348px' : '86px'};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    transition: margin-left .5s 1.5s;

    @media (425px >= width) {
        margin-left: 54px;
    }
`

const StyledStudentLayout = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #ebebeb;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`
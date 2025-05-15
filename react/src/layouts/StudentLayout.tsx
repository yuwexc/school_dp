import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AsideMenu from "../components/AsideMenu";
import DashboardHeader from "../components/DashboardHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../interfaces/user";

const StudentLayout = () => {

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const user = useSelector<RootState, User>((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role?.role_code === 'admin') {
            navigate('/admin');
        }
    }, [navigate, user.role?.role_code])

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

export const StyledStudentLayout = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #ebebeb;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`
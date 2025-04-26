import styled from "styled-components";
import Achievements from "../components/Achievements";
import MyCourses from "../components/MyCourses";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchAchievement } from "../features/achievementsSlice";
import { resetErrorAndStatus } from "../features/userSlice"
import { fetchMyCourses } from "../features/courseSlice";
import { User } from "../interfaces/user";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const user = useSelector<RootState, User>((state) => state.user.user);
    const status = useSelector<RootState, string | null>((state) => state.user.status);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role?.role_code === 'student') {
            dispatch(fetchAchievement());
        }
    }, [dispatch, user.role?.role_code]);

    useEffect(() => {
        if (status == 'failed') {
            dispatch(resetErrorAndStatus())
            localStorage.removeItem('ACCESS_TOKEN');
            navigate('/login');
        } else {
            dispatch(fetchMyCourses());
        }
    }, [status, navigate]);

    return (
        <StyledDashboard $role={user.role?.role_code}>
            {
                user.role?.role_code === 'student' &&
                <>
                    <Achievements />
                </>
            }
            <MyCourses />
        </StyledDashboard >
    )
}

export default Dashboard;

const StyledDashboard = styled.main<{ $role: string | undefined }>`
    height: 100%;
    padding: 28px;
    background-color: ${props => props.$role == 'teacher' ? 'whitesmoke' : 'white'};
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (577px <= width <= 768px) {
        padding: 24px;
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
        gap: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
        gap: 12px;
    }
`
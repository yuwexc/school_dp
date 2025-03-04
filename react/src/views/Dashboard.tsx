import styled from "styled-components";
import Achievements from "../components/Achievements";
import MyCourses from "../components/MyCourses";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchAchievement } from "../features/achievementsSlice";
import { fetchMyCourses } from "../features/courseSlice";
import { User } from "../interfaces/user";

const Dashboard = () => {

    const user = useSelector<RootState, User>((state) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        if (user.role?.role_code === 'student') {
            dispatch(fetchAchievement());
        }
        dispatch(fetchMyCourses());
    }, [dispatch, user.role?.role_code]);

    return (
        <StyledDashboard>
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

const StyledDashboard = styled.main`
    height: 100%;
    padding: 28px;
    background-color: white;
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
import styled from "styled-components";
import Achievements from "../components/Achievements";
import MyCourses from "../components/MyCourses";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { fetchAchievement } from "../features/achievementsSlice";
import { fetchMyCourses } from "../features/courseSlice";

const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAchievement());
        dispatch(fetchMyCourses());
    }, [dispatch]);

    return (
        <StyledDashboard>
            <Achievements />
            <MyCourses />
        </StyledDashboard>
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
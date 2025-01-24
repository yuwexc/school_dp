import styled from "styled-components";
import Achievements from "../components/Achievements";

const Dashboard = () => {
    return (
        <StyledDashboard>
            <Achievements />
        </StyledDashboard>
    )
}

export default Dashboard;

const StyledDashboard = styled.main`
    height: 100%;
    padding: 28px;
    background-color: white;
`
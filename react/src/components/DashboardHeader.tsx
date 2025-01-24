import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State, User } from "../interfaces/requests";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUser } from "../features/userSlice";
import FieldLoader from "./FieldLoader";

const DashboardHeader = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector<RootState, User>((state) => state.user.user);
    const status = useSelector((state: State) => state.user.status);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <StyledDashboardHeader>
            {
                status === 'loading' ? <FieldLoader /> : <p>Welcome, {user.last_name + ' ' + user.first_name}!</p>
            }
        </StyledDashboardHeader>
    )
}

export default DashboardHeader;

const StyledDashboardHeader = styled.header`
    background-color: white;
    height: 20px;
    padding: 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
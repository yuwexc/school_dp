import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../interfaces/requests";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUser } from "../features/userSlice";
import FieldLoader from "./FieldLoader";
import { useTranslation } from "react-i18next";
import { User } from "../interfaces/user";

const DashboardHeader = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector<RootState, User>((state) => state.user.user);
    const status = useSelector((state: State) => state.user.status);

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <StyledDashboardHeader>
            {
                status === 'loading' ?
                    <FieldLoader />
                    :
                    <>
                        <p style={{ fontSize: '18px' }}>
                            {t('dashboard_header.welcome')}, {user.last_name + ' ' + user.first_name}!
                        </p>
                        {
                            user.score != null && <p>&#11088;{user.score}</p>
                        }
                    </>
            }
        </StyledDashboardHeader>
    )
}

export default DashboardHeader;

const StyledDashboardHeader = styled.header`
    background-color: #f5f5f5;
    height: 20px;
    padding: 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
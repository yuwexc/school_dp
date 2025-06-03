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
    }, [dispatch]);

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
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {
                                user.score != null && user.role?.role_code == 'student' && <p>&#11088;{user.score}</p>
                            }
                            {
                                user.photo && typeof user.photo === 'string' ?
                                    <Photo $url={user.photo} />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="36" height="36" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none"><path d="M2340 4984 c-19 -2 -82 -11 -140 -20 -973 -145 -1771 -876 -2003 -1835 -52 -211 -62 -307 -62 -569 0 -312 24 -473 111 -742 241 -747 825 -1330 1572 -1572 273 -88 430 -111 752 -110 229 1 270 3 400 27 516 93 975 335 1330 703 362 374 579 811 667 1339 25 156 25 554 0 710 -93 559 -336 1025 -733 1404 -294 280 -642 478 -1029 585 -218 60 -350 78 -605 81 -124 2 -241 1 -260 -1z m431 -355 c710 -72 1340 -512 1655 -1154 379 -775 247 -1684 -338 -2324 -27 -29 -50 -52 -52 -50 -1 2 -20 33 -41 69 -175 295 -464 497 -792 555 -125 21 -1157 22 -1280 1 -334 -59 -623 -261 -798 -556 -21 -36 -40 -67 -41 -69 -2 -2 -25 21 -52 50 -453 496 -641 1161 -511 1816 207 1046 1188 1771 2250 1662z"></path><path d="M2380 3946 c-178 -38 -333 -121 -468 -250 -187 -180 -282 -401 -283 -658 0 -133 11 -204 46 -308 102 -301 344 -525 652 -607 141 -37 326 -37 467 0 318 85 555 312 662 637 26 80 28 96 29 260 0 153 -3 185 -23 253 -94 327 -345 574 -672 662 -87 23 -321 29 -410 11z"></path></g></svg>
                            }
                        </div>
                    </>
            }
        </StyledDashboardHeader>
    )
}

export default DashboardHeader;

const Photo = styled.div<{ $url: string }>`
    height: 40px;
    width: 40px;
    background-image: url('${props => props.$url}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
`

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
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Title } from "../styles/forms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { State } from "../interfaces/requests";
import { logoutUser } from "../features/userSlice";
import SmallLoader from "./SmallLoader";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    setIsHovered: Dispatch<SetStateAction<boolean>>
}

const AsideMenu: FC<Props> = ({ setIsHovered }) => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

    const links = [
        {
            to: '/dashboard',
            teacher: null,
            icon:
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
            name: t('aside.dashboard')
        },
        {
            to: '/my-courses',
            teacher: '/teacher/courses',
            icon:
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="22" height="22" viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0,24) scale(0.1,-0.1)" fill="#000000" stroke="none">
                        <path d="M53 183 c-45 -26 -53 -40 -28 -49 9 -4 15 -19 15 -35 0 -35 29 -56 82 -60 45 -4 78 22 78 61 0 16 7 30 15 34 25 9 17 23 -31 50 -56 31 -76 31 -131 -1z m115 -7 l44 -22 -27 -18 c-24 -16 -28 -16 -44 -2 -25 22 -38 20 -17 -3 29 -32 0 -35 -51 -5 l-46 27 44 23 c24 13 46 23 49 23 3 0 25 -10 48 -23z m-45 -84 c15 -2 27 -11 27 -19 0 -11 -11 -13 -42 -11 -37 3 -44 7 -46 27 -3 20 -1 22 15 16 10 -4 30 -10 46 -13z m57 -1 c0 -11 -4 -23 -10 -26 -6 -4 -10 5 -10 19 0 14 5 26 10 26 6 0 10 -9 10 -19z" />
                    </g>
                </svg>,
            name: t('aside.courses')
        },
        {
            to: '/settings',
            teacher: null,
            icon:
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.1987 2.58728C11.6971 2.31042 12.303 2.31043 12.8013 2.58728L20.0013 6.58728C20.5252 6.87829 20.85 7.43041 20.85 8.02964V15.9705C20.85 16.5697 20.5252 17.1219 20.0013 17.4129L12.8013 21.4129C12.303 21.6897 11.6971 21.6897 11.1987 21.4129L3.99871 17.4129C3.47489 17.1219 3.15002 16.5697 3.15002 15.9705V8.02964C3.15002 7.43041 3.4749 6.87829 3.99871 6.58728L11.1987 2.58728ZM12.0729 3.89852C12.0276 3.87335 11.9725 3.87335 11.9272 3.89851L4.72718 7.89852C4.67956 7.92497 4.65002 7.97516 4.65002 8.02964V15.9705C4.65002 16.025 4.67956 16.0752 4.72718 16.1016L11.9272 20.1016C11.9725 20.1268 12.0276 20.1268 12.0729 20.1016L19.2729 16.1016C19.3205 16.0752 19.35 16.025 19.35 15.9705V8.02964C19.35 7.97516 19.3205 7.92497 19.2729 7.89852L12.0729 3.89852Z" fill="black" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.25002 12.0001C7.25002 9.37672 9.37667 7.25008 12 7.25008C14.6234 7.25008 16.75 9.37672 16.75 12.0001C16.75 14.6234 14.6234 16.7501 12 16.7501C9.37667 16.7501 7.25002 14.6234 7.25002 12.0001ZM12 8.75008C10.2051 8.75008 8.75002 10.2051 8.75002 12.0001C8.75002 13.795 10.2051 15.2501 12 15.2501C13.795 15.2501 15.25 13.795 15.25 12.0001C15.25 10.2051 13.795 8.75008 12 8.75008Z" fill="black" />
                </svg>,
            name: t('aside.settings')
        }

    ];

    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: State) => state.user.status);

    const logout = async () => {
        await dispatch(logoutUser());
        localStorage.removeItem('ACCESS_TOKEN');
        navigate('/');

    }

    return (
        <Aside onMouseMove={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div onClick={() => move()} style={{
                cursor: 'pointer', display: 'flex', flexDirection: 'row',
                flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', height: '108px'
            }}>
                <Title translate="no">L</Title>
                <Title translate="no">I</Title>
                <Title translate="no">M</Title>
                <Title translate="no">N</Title>
            </div>
            <GroupLinks>
                {
                    links.map((link, index) => {
                        return (
                            <div key={index}>
                                <StyledLink to={link.to} $isCurrent={window.location.pathname.toString().slice(0, 11) === link.to
                                    || window.location.pathname.toString().slice(0, 16) === link.teacher ? true : false}>
                                    {link.icon}
                                    <p style={{ textWrap: 'nowrap' }}>{link.name}</p>
                                </StyledLink>
                            </div>
                        )
                    })
                }
            </GroupLinks>
            <GroupLinks>
                <div>
                    {
                        status === 'loading' ?
                            <LogOutButton disabled>
                                <div style={{ padding: '17.5px', backgroundColor: '#d91e18', borderRadius: '50%' }}>
                                    <SmallLoader />
                                </div>
                                <p>{t('aside.log_out')}</p>
                            </LogOutButton>
                            :
                            <LogOutButton onClick={() => logout()}>
                                <svg style={{ minWidth: '22px', maxWidth: '22px' }} width="31px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 18.25C11.5858 18.25 11.25 18.5858 11.25 19C11.25 19.4142 11.5858 19.75 12 19.75H18C18.9665 19.75 19.75 18.9665 19.75 18V6C19.75 5.0335 18.9665 4.25 18 4.25H12C11.5858 4.25 11.25 4.58579 11.25 5C11.25 5.41421 11.5858 5.75 12 5.75L18 5.75C18.1381 5.75 18.25 5.86193 18.25 6L18.25 18C18.25 18.1381 18.1381 18.25 18 18.25H12Z" fill="white" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5031 14.3652C15.1934 14.3652 15.7531 13.8056 15.7531 13.1152V10.8747C15.7531 10.1843 15.1934 9.6247 14.5031 9.6247L9.89048 9.6247C9.88396 9.55128 9.87713 9.47787 9.87 9.40448L9.81597 8.8486C9.73354 8.00049 8.83294 7.49258 8.06451 7.86084C6.43029 8.64403 4.95085 9.71578 3.69736 11.0245L3.59816 11.1281C3.13395 11.6128 3.13395 12.3771 3.59815 12.8618L3.69736 12.9654C4.95085 14.2741 6.43029 15.3459 8.06451 16.1291C8.83293 16.4973 9.73354 15.9894 9.81597 15.1413L9.87 14.5854C9.87713 14.512 9.88396 14.4386 9.89048 14.3652H14.5031ZM9.19511 12.8652C8.92874 12.8652 8.69326 13.0045 8.56008 13.216C8.49523 13.319 8.45464 13.4391 8.44656 13.5685C8.42842 13.8594 8.40524 14.15 8.37703 14.4403L8.36135 14.6017C7.3253 14.0677 6.36316 13.4028 5.49838 12.6239C5.27402 12.4218 5.05622 12.2121 4.84538 11.995C5.86892 10.9409 7.05651 10.0607 8.36135 9.38824L8.37703 9.54959C8.40524 9.83987 8.42842 10.1305 8.44656 10.4214C8.47122 10.8167 8.79902 11.1247 9.19511 11.1247H14.2531V12.8652H9.19511Z" fill="white" />
                                </svg>
                                <p>{t('aside.log_out')}</p>
                            </LogOutButton>
                    }
                </div>
            </GroupLinks>
        </Aside>
    )
}

export default AsideMenu;

const LogOutButton = styled.button`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border: 0;
    background-color: transparent;
    font-size: 16px;
    
    & > svg {
        background-color: #d91e18;
        border-radius: 50%;
        padding: 8px;
    }

    &:disabled {
        cursor: unset;
    }

    &:disabled > div {
        background-color: #d65854 !important;
    }
`

const StyledLink = styled(Link) <{ $isCurrent?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    & > svg {
        min-width: 22px;
        border-radius: 50%;
        padding: 8px;
    }

    ${({ $isCurrent }) =>
        $isCurrent ?
            css`
            & > svg, & > svg > g {
                background-color: #2d2d2d;

                & > path {
                    fill: white;
                }
            }
        `
            :
            css`
            & > svg {
                background-color: white;

                & > path {
                    fill: #2d2d2d;
                }
            }
        `
    }
`

const GroupLinks = styled.div`
    overflow: hidden;
    width: 38px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    transition: width 0.75s 1.5s;

    &:nth-child(2n) {
        transform: translateY(-50px);
    }
`

const Aside = styled.aside`
    position: fixed;
    top: 0;
    width: 38px;
    height: calc(100dvh - 48px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #e4e6ee;
    transition: width .5s 1.5s;
    border-right: 1px solid lightgray;
    z-index: 998;
    
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            width: 300px;
        }

        &:hover > ${GroupLinks} {
            width: 100%;
        }
    }

    @media (425px >= width) {
        padding: 24px 8px;

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                width: 75vw;
            }
        }
    }
`
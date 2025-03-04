import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CourseItemInterface } from "../interfaces/course";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMyCoursesItem, requestAddMyCoursesItem } from "../features/courseSlice";
import { State } from "../interfaces/requests";
import { changeLimit } from "../features/lessonsLimit";
import LessonCard from "../components/LessonCard";
import { Author, Buttons, Characteristics, LinkToResources } from "../components/CourseCard";
import { LevelColors } from "../interfaces/level";
import Requested from "../components/Requested";

import Modal from "../components/Modal";
import { ModalInterface } from "../interfaces/modal";
import { t } from "i18next";

const CourseItem = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = useSelector<RootState, CourseItemInterface | null>((state) => state.courses.course);
    const limit = useSelector<RootState, number>((state) => state.lessonsLimit.limit);
    const status = useSelector((state: State) => state.courses.status);
    const dispatch = useDispatch<AppDispatch>();

    const modal = useSelector<RootState, ModalInterface>((state) => state.modal.modal);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchMyCoursesItem(id!));

    }, [dispatch, id]);

    useEffect(() => {
        const pathname = window.location.pathname.slice(1);

        if (pathname.substring(0, pathname.indexOf('/')) === 'my-courses' && course?.access?.access_status == '') {
            navigate('/courses/' + id);
        }

    }, [course, id, navigate])


    const handleClick = () => {
        if (localStorage.getItem('ACCESS_TOKEN')) {
            dispatch(requestAddMyCoursesItem(course!.id_course));
        } else {
            navigate('/login');
        }
    }

    return (
        <StyledMain>
            {
                status === 'loading' &&
                <>
                    <Loader $height={318} />
                    <Loader $height={160} />
                    <Loader $height={230} />
                </>
            }
            {
                status === 'succeeded' && course &&
                <>
                    <Flex>
                        <HeaderSection $access={course.access?.access_status}>
                            <CourseInfo>
                                <h1>{course.course_name}</h1>
                                {
                                    course.access?.access_status && <p>{course.course_description}</p>
                                }
                                <Characteristics>
                                    <LinkToResources
                                        to={'/courses'}
                                        $backgroundColor={LevelColors.get(course.level.level_code)!}>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                                <path d="M3963 4625 c-170 -46 -304 -181 -348 -350 -13 -52 -15 -260 -15 -1715 0 -1435 2 -1663 15 -1713 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 182 34 344 196 379 379 14 74 14 3308 0 3382 -34 176 -177 327 -355 374 -81 21 -554 21 -632 0z" />
                                                <path d="M2238 3735 c-120 -33 -240 -127 -296 -233 -65 -122 -62 -54 -62 -1387 0 -1041 2 -1219 15 -1268 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 182 34 344 196 379 379 6 35 10 480 10 1255 0 1323 3 1256 -62 1378 -36 69 -135 165 -202 197 -94 46 -135 51 -421 50 -187 -1 -284 -5 -317 -14z" />
                                                <path d="M488 2837 c-163 -56 -282 -190 -317 -355 -7 -36 -11 -293 -11 -815 0 -644 2 -772 15 -820 47 -179 198 -323 374 -357 69 -13 512 -13 582 0 184 34 345 197 379 382 7 36 10 328 8 834 -3 774 -3 779 -25 837 -49 129 -155 238 -280 288 -56 23 -70 24 -358 26 -291 3 -302 2 -367 -20z" />
                                            </g>
                                        </svg>
                                        <p>{course.level.level_code}</p>
                                    </LinkToResources>
                                    {
                                        course.category && <LinkToResources to={'/topics'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                                    <path d="M3593 4755 c-144 -40 -207 -88 -499 -379 -316 -316 -369 -392 -393 -567 -19 -138 12 -271 91 -391 55 -83 543 -571 626 -626 119 -78 247 -108 387 -91 176 22 253 75 571 393 347 348 389 416 389 636 0 230 -25 271 -395 640 -295 295 -341 332 -459 374 -74 26 -244 32 -318 11z" />
                                                    <path d="M994 4630 c-148 -21 -238 -64 -339 -165 -79 -79 -126 -160 -152 -261 -16 -60 -18 -120 -18 -464 0 -444 3 -471 65 -596 75 -152 230 -270 396 -299 112 -20 766 -20 879 0 228 41 409 222 450 450 20 113 20 767 0 879 -30 167 -146 321 -299 396 -45 22 -103 45 -131 51 -61 14 -764 21 -851 9z" />
                                                    <path d="M941 2275 c-205 -38 -380 -204 -438 -416 -16 -56 -18 -113 -18 -469 0 -450 4 -483 68 -604 41 -79 154 -192 233 -233 120 -64 155 -68 594 -68 444 0 471 3 596 65 153 75 269 229 299 396 20 112 20 766 0 879 -37 206 -187 374 -395 441 -48 15 -104 18 -460 20 -311 2 -422 0 -479 -11z" />
                                                    <path d="M3291 2275 c-224 -41 -406 -224 -446 -450 -20 -113 -20 -767 0 -879 30 -167 146 -321 299 -396 125 -62 152 -65 596 -65 439 0 474 4 594 68 79 41 192 154 233 233 64 120 68 155 68 594 0 444 -3 471 -65 596 -75 153 -229 269 -396 299 -109 20 -775 19 -883 0z" />
                                                </g>
                                            </svg>
                                            <p>{course.category}</p>
                                        </LinkToResources>
                                    }
                                    <Author>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
                                                <path d="M2340 4984 c-19 -2 -82 -11 -140 -20 -973 -145 -1771 -876 -2003 -1835 -52 -211 -62 -307 -62 -569 0 -312 24 -473 111 -742 241 -747 825 -1330 1572 -1572 273 -88 430 -111 752 -110 229 1 270 3 400 27 516 93 975 335 1330 703 362 374 579 811 667 1339 25 156 25 554 0 710 -93 559 -336 1025 -733 1404 -294 280 -642 478 -1029 585 -218 60 -350 78 -605 81 -124 2 -241 1 -260 -1z m431 -355 c710 -72 1340 -512 1655 -1154 379 -775 247 -1684 -338 -2324 -27 -29 -50 -52 -52 -50 -1 2 -20 33 -41 69 -175 295 -464 497 -792 555 -125 21 -1157 22 -1280 1 -334 -59 -623 -261 -798 -556 -21 -36 -40 -67 -41 -69 -2 -2 -25 21 -52 50 -453 496 -641 1161 -511 1816 207 1046 1188 1771 2250 1662z" />
                                                <path d="M2380 3946 c-178 -38 -333 -121 -468 -250 -187 -180 -282 -401 -283 -658 0 -133 11 -204 46 -308 102 -301 344 -525 652 -607 141 -37 326 -37 467 0 318 85 555 312 662 637 26 80 28 96 29 260 0 153 -3 185 -23 253 -94 327 -345 574 -672 662 -87 23 -321 29 -410 11z" />
                                            </g>
                                        </svg>
                                        <p style={{ color: 'white' }}>{course.author.first_name} {course.author.last_name}</p>
                                    </Author>
                                </Characteristics>
                                {
                                    course.access?.access_status != 'enrolled' && course.access?.access_status != '' &&
                                    <StyledButtons $access={course.access?.access_status}>
                                        {
                                            course.access?.access_status === 'requested' && <Requested access={course.access!.id_course_access} />
                                        }
                                        {
                                            course.access?.access_status === 'expelled' && <p style={{ lineHeight: '1' }}>Вы были исключены</p>
                                        }
                                    </StyledButtons>
                                }
                            </CourseInfo>
                            <IMG $src={course.image} />
                        </HeaderSection>
                        {
                            course.access?.access_status == '' &&
                            <Offer>
                                <h2>Начните заниматься английским</h2>
                                <p>{course.course_description}</p>
                                <Button onClick={() => handleClick()}>Начать!</Button>
                            </Offer>
                        }
                    </Flex>
                    <Program>
                        <Title>Содержание курса</Title>
                        {course.lessons &&
                            <Lessons>
                                {
                                    course.lessons
                                        .filter((_, index) => index < limit)
                                        .map((lesson, index, array) => <LessonCard
                                            lesson={lesson}
                                            access={course.access}
                                            index={index}
                                            isOpened={() => {
                                                if (index < 1) {
                                                    return true;
                                                } else {
                                                    if (array[index - 1].mark != null) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                }
                                            }}
                                            key={index} />)
                                }
                            </Lessons>
                        }
                        <ShowMore
                            style={{ display: (limit >= course.lessons!.length) ? 'none' : 'block' }}
                            onClick={() => dispatch(changeLimit())}
                        >
                            Показать ещё
                        </ShowMore>
                    </Program>
                    {
                        modal.state && <Modal
                            header={t('modal.header')}
                            main={t('modal.main')}
                            access={modal.access}
                        />
                    }
                </>
            }
        </StyledMain >
    )
}

export default CourseItem;

const LoaderAnimation = keyframes`
    0% {
        background-position: right;
    }
`

const Loader = styled.div<{ $height: number }>`
    width: 100%;
    height: ${props => props.$height}px;
    border-radius: 24px;
    display: inline-block;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${LoaderAnimation} 1.75s infinite linear;
`

const ShowMore = styled.button`
    align-self: center;
    width: fit-content;
    border: 1px solid #2d2d2d;
    border-radius: 6px;
    padding: 4px 6px;
    background-color: unset;
    font-weight: 500;
    cursor: pointer;
`

const StyledButtons = styled(Buttons) <{ $access: string | undefined }>`
    padding-top: 24px;
    min-height: ${props => props.$access === 'expelled' ? 'unset' : '35px'};

    @media (max-width: 767px) {
        padding-top: 30px;
    }

    @media (max-width: 576px) {
        padding-top: 20px;
    }
`

const Lessons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 767px) {
        gap: 8px;
    }
`

const Title = styled.h2`
    width: 100%;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
    word-break: break-word;

    @media (max-width: 1279px) {
        font-size: 32px;
    }

    @media (max-width: 767px) {
        min-width: 100%;
    }

    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const Program = styled.section`
    width: 100%;
    max-width: 1288px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 48px;
    gap: 20px;
    border-radius: 24px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
        padding: 32px 32px 48px;
        align-items: center;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 12px;
        padding: 24px;
    }
`

const Animation = keyframes`
    0% {
        box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.35);
    }

    100% {
        box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
    }

`

const Button = styled.button`
    margin-top: auto;
    min-width: 240px;
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #a29bfe;
    color: white;
    border: 0;
    border-radius: 12px;
    font-size: 20px;
    cursor: pointer;
    animation: ${Animation} 1s infinite;

    @media (576px >= width) {
        height: 35px;
        min-width: 130px;
    }
`

const Offer = styled.section`
    flex-grow: 1;
    max-width: 1288px;
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    border-radius: 24px;
    background-color: #6c5ce7;
    color: white;

    & > h2 {
        width: 100%;
        white-space: pre-wrap;
        font-weight: 600;
        font-size: 32px;
        color: white;

        @media (max-width: 1279px) {
            font-size: 24px;
        }

        @media (max-width: 767px) {
            min-width: 100%;
        }

        @media (max-width: 576px) {
            font-size: 24px;
        }
    }

    & > p {
        color: white;
    }

    @media (max-width: 1279px) {
        padding: 32px;
    }

    @media (max-width: 767px) {
        padding: 24px;
    }
`

const IMG = styled.div <{ $src: string | null }>`
    min-height: 238px;
    min-width: 238px;
    background-image: url(${props => props.$src == null ? '/images/4.jpeg' : props.$src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;

    @media (max-width: 768px) {
        display: none;
    }
`

const CourseInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;

    & > h1 {
        width: 100%;
        margin: 0px 0px 24px;
        white-space: pre-wrap;
        font-weight: 600;
        line-height: 68px;
        font-size: 60px;

        @media (max-width: 1279px) {
            font-size: 36px;
            line-height: 45px;
        }

        @media (max-width: 767px) {
            margin: 0px 0px 30px;
            min-width: 100%;
        }

        @media (max-width: 576px) {
            font-size: 24px;
            line-height: unset;
            margin-bottom: 20px;
        }
    }

    & > p {
        width: 100%;
        max-width: 660px;
        white-space: pre-wrap;
        font-size: 18px;
        margin: 0px 0px 24px;

        @media (max-width: 1279px) {
            font-size: 16px;
            line-height: 24px;
        }

        @media (max-width: 767px) {
            margin: 0px 0px 30px;
        }

        @media (max-width: 576px) {
            margin-bottom: 20px;
        }
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`

const HeaderSection = styled.section <{ $access: string | undefined }>`
    width: ${props => props.$access ? '100%' : '70%'};
    max-width: ${props => props.$access ? '1288px' : 'unset'};
    display: flex;
    justify-content: space-between;
    background-color: ${props => {
        switch (props.$access) {
            case 'expelled':
                return '#ffd7d7';
                break;
            case 'requested':
                return '#fdebd0';
                break;
            case 'enrolled':
                return '#eafaf1';
                break;
            default:
                return 'rgb(245, 245, 245)';
                break;
        }
    }};
    padding: 48px;
    gap: 24px;
    border-radius: 24px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
        padding: 32px 32px 48px;
        gap: 30px;
        align-items: center;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        padding: 24px;
    }
`

const Flex = styled.div`
    width: 100%;
    max-width: 1384px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;

    @media (max-width: 1279px) {
        flex-direction: column;
    }

    @media (425px <= width <= 576px) {
        gap: 20px;
    }

    @media (425px >= width) {
        gap: 12px;
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
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
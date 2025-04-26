import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AppDispatch, RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import { useEffect } from "react";
import { fetchMyCoursesItem } from "../features/courseSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Characteristics, LinkToResources } from "../components/CourseCard";
import { LevelColors } from "../interfaces/level";
import { User } from "../interfaces/user";
import { Button } from "../styles/forms";
import LessonLine from "../components/LessonLine";

const CourseTeacherView = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const user = useSelector<RootState, User>((state) => state.user.user);
    const course = useSelector<RootState, CourseItemInterface | null>((state) => state.courses.course);
    const status = useSelector((state: State) => state.courses.status);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        dispatch(fetchMyCoursesItem(id!));

    }, [dispatch, id]);

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
                    <Intro>
                        <Block>
                            <IMG $src={course.image}>
                                {
                                    course.author.id_user === user.id_user &&
                                    <LinkToResources
                                        to={'/teacher/courses/' + course.id_course + '/edit/image'}
                                        style={{ position: 'absolute', bottom: 0, right: 0 }}
                                        $backgroundColor={'#2d2d2d'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.41575C21.6471 5.70687 21.615 6.10248 21.3588 6.35876L12.1664 15.5511C12.0721 15.6454 11.9545 15.7128 11.8256 15.7465L7.99716 16.7465C7.87229 16.7791 7.74358 16.7784 7.62265 16.7476C7.49408 16.7149 7.37431 16.6482 7.27729 16.5511C7.08902 16.3629 7.01468 16.0889 7.08197 15.8313L8.08197 12.0028C8.11144 11.89 8.16673 11.7786 8.24322 11.6912L17.4697 2.46967C17.5504 2.38891 17.6477 2.32846 17.7536 2.29163C17.8321 2.26432 17.9153 2.25 18 2.25C18.1989 2.25 18.3897 2.32902 18.5303 2.46967L21.3588 5.2981C21.3954 5.33471 21.4274 5.37416 21.4549 5.41575ZM19.7678 5.82843L18 4.06066L9.48184 12.5788L8.85685 14.9716L11.2496 14.3466L19.7678 5.82843Z" fill="white" />
                                            <path d="M19.6414 17.1603C19.9148 14.8227 20.0018 12.4688 19.9023 10.1208C19.8976 10.0084 19.9399 9.89898 20.0194 9.81942L21.0027 8.83609C21.1236 8.71519 21.3302 8.79194 21.3415 8.96254C21.5265 11.7522 21.4564 14.5545 21.1312 17.3346C20.8946 19.3571 19.2703 20.9421 17.2583 21.167C13.7917 21.5544 10.2083 21.5544 6.74177 21.167C4.72971 20.9421 3.10538 19.3571 2.86883 17.3346C2.45429 13.7903 2.45429 10.2097 2.86883 6.66543C3.10538 4.6429 4.72971 3.05789 6.74177 2.83301C9.37152 2.5391 12.0685 2.46815 14.7306 2.62016C14.9022 2.62996 14.9804 2.83757 14.8589 2.95909L13.8664 3.95165C13.7877 4.03034 13.6798 4.07261 13.5685 4.06885C11.3421 3.99376 9.10055 4.07872 6.90838 4.32373C5.57827 4.47239 4.51278 5.522 4.35867 6.83968C3.95767 10.2682 3.95767 13.7318 4.35867 17.1603C4.51278 18.478 5.57827 19.5276 6.90838 19.6763C10.2642 20.0513 13.7358 20.0513 17.0916 19.6763C18.4218 19.5276 19.4872 18.478 19.6414 17.1603Z" fill="white" />
                                        </svg>
                                    </LinkToResources>
                                }
                            </IMG>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '20px' }}>
                                <Flex>
                                    <Title>{course.course_name.charAt(0).toUpperCase() + course.course_name.slice(1)}</Title>
                                    {
                                        course.author.id_user === user.id_user &&
                                        <StyledLink to={'/teacher/courses/' + course.id_course + '/edit/course_name'}>
                                            Редактировать
                                        </StyledLink>
                                    }
                                </Flex>
                                <Characteristics style={{ marginTop: 'unset' }}>
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
                                        course.author.id_user === user.id_user &&
                                        <LinkToResources
                                            to={'/teacher/courses/' + course.id_course + '/edit/level_id'}
                                            $backgroundColor={'#2d2d2d'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.41575C21.6471 5.70687 21.615 6.10248 21.3588 6.35876L12.1664 15.5511C12.0721 15.6454 11.9545 15.7128 11.8256 15.7465L7.99716 16.7465C7.87229 16.7791 7.74358 16.7784 7.62265 16.7476C7.49408 16.7149 7.37431 16.6482 7.27729 16.5511C7.08902 16.3629 7.01468 16.0889 7.08197 15.8313L8.08197 12.0028C8.11144 11.89 8.16673 11.7786 8.24322 11.6912L17.4697 2.46967C17.5504 2.38891 17.6477 2.32846 17.7536 2.29163C17.8321 2.26432 17.9153 2.25 18 2.25C18.1989 2.25 18.3897 2.32902 18.5303 2.46967L21.3588 5.2981C21.3954 5.33471 21.4274 5.37416 21.4549 5.41575ZM19.7678 5.82843L18 4.06066L9.48184 12.5788L8.85685 14.9716L11.2496 14.3466L19.7678 5.82843Z" fill="white" />
                                                <path d="M19.6414 17.1603C19.9148 14.8227 20.0018 12.4688 19.9023 10.1208C19.8976 10.0084 19.9399 9.89898 20.0194 9.81942L21.0027 8.83609C21.1236 8.71519 21.3302 8.79194 21.3415 8.96254C21.5265 11.7522 21.4564 14.5545 21.1312 17.3346C20.8946 19.3571 19.2703 20.9421 17.2583 21.167C13.7917 21.5544 10.2083 21.5544 6.74177 21.167C4.72971 20.9421 3.10538 19.3571 2.86883 17.3346C2.45429 13.7903 2.45429 10.2097 2.86883 6.66543C3.10538 4.6429 4.72971 3.05789 6.74177 2.83301C9.37152 2.5391 12.0685 2.46815 14.7306 2.62016C14.9022 2.62996 14.9804 2.83757 14.8589 2.95909L13.8664 3.95165C13.7877 4.03034 13.6798 4.07261 13.5685 4.06885C11.3421 3.99376 9.10055 4.07872 6.90838 4.32373C5.57827 4.47239 4.51278 5.522 4.35867 6.83968C3.95767 10.2682 3.95767 13.7318 4.35867 17.1603C4.51278 18.478 5.57827 19.5276 6.90838 19.6763C10.2642 20.0513 13.7358 20.0513 17.0916 19.6763C18.4218 19.5276 19.4872 18.478 19.6414 17.1603Z" fill="white" />
                                            </svg>
                                        </LinkToResources>
                                    }

                                    <LinkToResources to={''}>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16px" height="16px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000" stroke="none">
                                                <path d="M3593 4755 c-144 -40 -207 -88 -499 -379 -316 -316 -369 -392 -393 -567 -19 -138 12 -271 91 -391 55 -83 543 -571 626 -626 119 -78 247 -108 387 -91 176 22 253 75 571 393 347 348 389 416 389 636 0 230 -25 271 -395 640 -295 295 -341 332 -459 374 -74 26 -244 32 -318 11z" />
                                                <path d="M994 4630 c-148 -21 -238 -64 -339 -165 -79 -79 -126 -160 -152 -261 -16 -60 -18 -120 -18 -464 0 -444 3 -471 65 -596 75 -152 230 -270 396 -299 112 -20 766 -20 879 0 228 41 409 222 450 450 20 113 20 767 0 879 -30 167 -146 321 -299 396 -45 22 -103 45 -131 51 -61 14 -764 21 -851 9z" />
                                                <path d="M941 2275 c-205 -38 -380 -204 -438 -416 -16 -56 -18 -113 -18 -469 0 -450 4 -483 68 -604 41 -79 154 -192 233 -233 120 -64 155 -68 594 -68 444 0 471 3 596 65 153 75 269 229 299 396 20 112 20 766 0 879 -37 206 -187 374 -395 441 -48 15 -104 18 -460 20 -311 2 -422 0 -479 -11z" />
                                                <path d="M3291 2275 c-224 -41 -406 -224 -446 -450 -20 -113 -20 -767 0 -879 30 -167 146 -321 299 -396 125 -62 152 -65 596 -65 439 0 474 4 594 68 79 41 192 154 233 233 64 120 68 155 68 594 0 444 -3 471 -65 596 -75 153 -229 269 -396 299 -109 20 -775 19 -883 0z" />
                                            </g>
                                        </svg>
                                        <p>{course.category?.category_name || 'Нет категории'}</p>
                                    </LinkToResources>
                                    {
                                        course.author.id_user === user.id_user &&
                                        <LinkToResources
                                            to={'/teacher/courses/' + course.id_course + '/edit/category_id'}
                                            $backgroundColor={'#2d2d2d'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M21.4549 5.41575C21.6471 5.70687 21.615 6.10248 21.3588 6.35876L12.1664 15.5511C12.0721 15.6454 11.9545 15.7128 11.8256 15.7465L7.99716 16.7465C7.87229 16.7791 7.74358 16.7784 7.62265 16.7476C7.49408 16.7149 7.37431 16.6482 7.27729 16.5511C7.08902 16.3629 7.01468 16.0889 7.08197 15.8313L8.08197 12.0028C8.11144 11.89 8.16673 11.7786 8.24322 11.6912L17.4697 2.46967C17.5504 2.38891 17.6477 2.32846 17.7536 2.29163C17.8321 2.26432 17.9153 2.25 18 2.25C18.1989 2.25 18.3897 2.32902 18.5303 2.46967L21.3588 5.2981C21.3954 5.33471 21.4274 5.37416 21.4549 5.41575ZM19.7678 5.82843L18 4.06066L9.48184 12.5788L8.85685 14.9716L11.2496 14.3466L19.7678 5.82843Z" fill="white" />
                                                <path d="M19.6414 17.1603C19.9148 14.8227 20.0018 12.4688 19.9023 10.1208C19.8976 10.0084 19.9399 9.89898 20.0194 9.81942L21.0027 8.83609C21.1236 8.71519 21.3302 8.79194 21.3415 8.96254C21.5265 11.7522 21.4564 14.5545 21.1312 17.3346C20.8946 19.3571 19.2703 20.9421 17.2583 21.167C13.7917 21.5544 10.2083 21.5544 6.74177 21.167C4.72971 20.9421 3.10538 19.3571 2.86883 17.3346C2.45429 13.7903 2.45429 10.2097 2.86883 6.66543C3.10538 4.6429 4.72971 3.05789 6.74177 2.83301C9.37152 2.5391 12.0685 2.46815 14.7306 2.62016C14.9022 2.62996 14.9804 2.83757 14.8589 2.95909L13.8664 3.95165C13.7877 4.03034 13.6798 4.07261 13.5685 4.06885C11.3421 3.99376 9.10055 4.07872 6.90838 4.32373C5.57827 4.47239 4.51278 5.522 4.35867 6.83968C3.95767 10.2682 3.95767 13.7318 4.35867 17.1603C4.51278 18.478 5.57827 19.5276 6.90838 19.6763C10.2642 20.0513 13.7358 20.0513 17.0916 19.6763C18.4218 19.5276 19.4872 18.478 19.6414 17.1603Z" fill="white" />
                                            </svg>
                                        </LinkToResources>
                                    }
                                </Characteristics>
                                {
                                    course.author.id_user === user.id_user &&
                                    <Flex>
                                        <p><span style={{ fontWeight: 'bold' }}>ID курса:</span> {course.id_course}</p>
                                    </Flex>
                                }
                                <Flex>
                                    <p><span style={{ fontWeight: 'bold' }}>Описание курса:</span> {course.course_description}</p>
                                    {
                                        course.author.id_user === user.id_user &&
                                        <StyledLink to={'/teacher/courses/' + course.id_course + '/edit/course_description'}>
                                            Редактировать
                                        </StyledLink>
                                    }
                                </Flex>
                                <Flex>
                                    <p><span style={{ fontWeight: 'bold' }}>Количество уроков:</span> {course.lessons?.length}</p>
                                </Flex>
                            </div>
                        </Block>
                    </Intro>
                    <Intro>
                        <Flex>
                            <Title>Уроки</Title>
                            <AddLessonButton onClick={() => {
                                navigate('/teacher/courses/' + course.id_course + '/create-lesson');
                            }}>+ новый урок</AddLessonButton>
                        </Flex>
                        {
                            course.lessons?.map((lesson, index) => <LessonLine lesson={lesson} index={index + 1} key={index} />)
                        }
                        <AddLessonButtonEnd onClick={() => {
                            navigate('/teacher/courses/' + course.id_course + '/create-lesson');
                        }}>+ новый урок</AddLessonButtonEnd>
                    </Intro>
                </>
            }
        </StyledMain>
    )
}

export default CourseTeacherView;

const AddLessonButtonEnd = styled(Button)`
    display: none;

    @media (max-width: 767px) {
        display: block;
    }
`

const AddLessonButton = styled(Button)`
    @media (max-width: 767px) {
        display: none;
    }
`

const Block = styled.div`
    display: flex;
    align-items: stretch;
    gap: 20px;

    @media (max-width: 767px) {
        flex-direction: column;
    }
`

const IMG = styled.div <{ $src: string | null }>`
    position: relative;
    width: 200px;
    aspect-ratio: 9 / 12;
    background-image: url(${props => props.$src == null ? '/images/4.jpeg' : '/images/4.jpeg'});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 12px;

    @media (max-width: 767px) {
        width: 100%;
        aspect-ratio: 1;
    }
`

const StyledLink = styled(Link)`
    color: #6c5ce7;
    font-weight: 600;
    align-self: center;
    margin-right: 6px;

    @media (max-width: 767px) {
        align-self: unset;
        margin-right: unset;
        margin-bottom: 12px;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    @media (max-width: 767px) {
        flex-direction: column;
        justify-content: unset;
        align-items: flex-start;
    }
`

const Title = styled.h2`
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    word-break: break-word;

    @media (max-width: 1279px) {
        font-size: 32px;
    }

    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const Intro = styled.section`
    width: calc(100% - 64px);
    max-width: 1304px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 32px;
    gap: 20px;
    border-radius: 24px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
        padding: 32px 32px 48px;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 12px;
        padding: 24px;
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: white;

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

const LoaderAnimation = keyframes`
    0% {
        background-position: right;
    }
`

const Loader = styled.div<{ $height: number }>`
    width: 100%;
    height: ${props => props.$height}px;
    border-radius: 18px;
    display: inline-block;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${LoaderAnimation} 1.75s infinite linear;
`
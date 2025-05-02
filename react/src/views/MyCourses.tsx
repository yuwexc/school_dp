import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import FieldLoader from "../components/FieldLoader";
import { useEffect } from "react";
import { fetchMyCourses } from "../features/courseSlice";
import CourseCard from "../components/CourseCard";
import { useTranslation } from "react-i18next";
import { User } from "../interfaces/user";
import Course from "../components/Course";
import { Link } from "react-router-dom";
import { Button } from "../styles/forms";

const MyCourses = () => {

    const user = useSelector<RootState, User>((state) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchMyCourses());
    }, [dispatch]);

    const myCourses = useSelector<RootState, CourseItemInterface[] | null>((state) => state.courses.myCourses);
    const status = useSelector((state: State) => state.courses.status);

    return (
        <StyledMyCourses>
            <Flex>
                <Title>
                    {
                        status === 'loading' ?
                            <FieldLoader borderRadius={24} />
                            :
                            t('dashboard.myCourses.title')
                    }
                </Title>
                {
                    user.role?.role_code === 'teacher' && <Button as={Link} to={'/teacher/courses/create'} style={{ padding: 0 }}>Создать курс</Button>
                }
            </Flex>
            <Courses $role={user.role?.role_code}>
                {
                    status === 'loading' ?
                        <>
                            <FieldLoader flexGrow={1} borderRadius={24} />
                            <FieldLoader flexGrow={1} borderRadius={24} />
                        </>
                        :
                        <>
                            {
                                myCourses?.length != 0 ?
                                    myCourses?.map((course, index) => {
                                        if (user.role?.role_code === 'student') {
                                            return <CourseCard course={course} key={index} />
                                        } else {
                                            return <Course course={course} key={index} />
                                        }
                                    })
                                    :
                                    <>
                                        <p style={{ alignSelf: 'center' }}>{t('dashboard.myCourses.not')}</p>
                                        <Link to={'/courses'} style={{ padding: 'unset', fontWeight: 500 }}><span style={{ textDecoration: 'underline' }}>{t('dashboard.myCourses.go')}</span> &#8594;</Link>
                                    </>
                            }
                        </>
                }
            </Courses>
        </StyledMyCourses>
    )
}

export default MyCourses;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Courses = styled.div<{ $role: string | undefined }>`
    display: flex;
    flex-direction: ${props => props.$role == 'student' ? 'row' : 'column'};
    flex-wrap: wrap;
    gap: ${props => props.$role == 'student' ? '24px' : '12px'};

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const Title = styled.h2`
    width: 100%;
    text-wrap: nowrap;

    @media (width <= 768px) {
        font-size: 20px;
    }
`

const StyledMyCourses = styled.main`
    height: 100%;
    padding: 28px;
    background-color: rgb(245, 245, 245);
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
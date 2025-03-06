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
            <Title>
                {
                    status === 'loading' ?
                        <FieldLoader borderRadius={24} />
                        :
                        t('dashboard.myCourses.title')
                }
            </Title>
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
                                    <p>{t('dashboard.myCourses.not')}</p>
                            }
                        </>
                }
            </Courses>
        </StyledMyCourses>
    )
}

export default MyCourses;

const Courses = styled.div<{ $role: string | undefined }>`
    display: flex;
    flex-direction: ${props => props.$role == 'student' ? 'row' : 'column'};
    flex-wrap: wrap;
    gap: ${props => props.$role == 'student' ? '24px' : '12px'};
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
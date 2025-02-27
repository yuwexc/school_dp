import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import FieldLoader from "../components/FieldLoader";
import { useEffect } from "react";
import { fetchMyCourses } from "../features/courseSlice";
import CourseCard from "../components/CourseCard";

const MyCourses = () => {

    const dispatch = useDispatch<AppDispatch>();

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
                        'My courses'
                }
            </Title>
            <Courses>
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
                                    myCourses?.map((course, index) =>
                                        <CourseCard course={course} key={index} />
                                    )
                                    :
                                    <p>У вас нет курсов</p>
                            }
                        </>
                }
            </Courses>
        </StyledMyCourses>
    )
}

export default MyCourses;

const Courses = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
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
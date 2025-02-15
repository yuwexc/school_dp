import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import Course from "./Course";
import styled from "styled-components";
import FieldLoader from "./FieldLoader";

const MyCourses = () => {

    const myCourses = useSelector<RootState, CourseItemInterface[] | null>((state) => state.courses.myCourses);
    const status = useSelector((state: State) => state.courses.status);

    return (
        <Section>
            <div style={{ display: 'flex', gap: '24px' }}>
                <h2 style={{ width: '100%' }}>
                    {
                        status === 'loading' ?
                            <FieldLoader borderRadius={24} />
                            :
                            <>
                                {'My courses | '}
                                <Look href={'/my-courses'}>view all my courses &#8594;</Look>
                            </>
                    }
                </h2>
            </div>
            {
                status === 'loading' ?
                    <>
                        <FieldLoader flexGrow={1} borderRadius={24} />
                        <FieldLoader flexGrow={1} borderRadius={24} />
                    </>
                    :
                    myCourses && myCourses.map((course, index) => <Course course={course} key={index} />)
            }
        </Section >
    )
}

export default MyCourses;

const Look = styled.a`
    &:hover {
        text-decoration: underline;
    }
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (577px <= width <= 768px) {
        gap: 20px;
    }

    @media (425px <= width <= 576px) {
        gap: 16px;
    }

    @media (425px >= width) {
        gap: 12px;
    }
`
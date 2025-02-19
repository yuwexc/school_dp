import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import Course from "./Course";
import styled from "styled-components";
import FieldLoader from "./FieldLoader";
import Modal from "./Modal";
import { ModalInterface } from "../interfaces/modal";

const MyCourses = () => {

    const modal = useSelector<RootState, ModalInterface>((state) => state.modal.modal);
    const myCourses = useSelector<RootState, CourseItemInterface[] | null>((state) => state.courses.myCourses);
    const status = useSelector((state: State) => state.courses.status);

    return (
        <Section>
            <Title>
                {
                    status === 'loading' ?
                        <FieldLoader borderRadius={24} />
                        :
                        <>
                            {'My courses | '}
                            <Look href={'/my-courses'}><span>view all my courses</span> &#8594;</Look>
                        </>
                }
            </Title>
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
                                myCourses?.slice(0, 3).map((course, index) =>
                                    <Course
                                        course={course}
                                        key={index}
                                    />
                                )
                                :
                                <p>У вас нет курсов</p>
                        }
                    </>
            }
            {
                modal.state && <Modal
                    header={'Подтверждение удаления заявки'}
                    main={'Вы действительно хотите отозвать заявку?'}
                    access={modal.access}
                />
            }
        </Section>
    )
}

export default MyCourses;

const Look = styled.a`
    & > span {
        text-decoration: underline;
    }
`

const Title = styled.h2`
    width: 100%;
    text-wrap: nowrap;

    @media (425px <= width <= 768px) {
        font-size: 20px;
    }

    @media (425px >= width) {
        font-size: 20px;
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
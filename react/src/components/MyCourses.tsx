import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import Course from "./Course";
import styled from "styled-components";
import FieldLoader from "./FieldLoader";
import Modal from "./Modal";
import { ModalInterface } from "../interfaces/modal";
import { useTranslation } from "react-i18next";

const MyCourses = () => {

    const modal = useSelector<RootState, ModalInterface>((state) => state.modal.modal);
    const myCourses = useSelector<RootState, CourseItemInterface[] | null>((state) => state.courses.myCourses);
    const status = useSelector((state: State) => state.courses.status);

    const { t } = useTranslation();

    return (
        <Section>
            <Title>
                {
                    status === 'loading' ?
                        <FieldLoader borderRadius={24} />
                        :
                        <>
                            {t('dashboard.myCourses.title') + ' | '}
                            <Look href={'/my-courses'}><span>{t('dashboard.myCourses.view')}</span> &#8594;</Look>
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
                                <p>{t('dashboard.myCourses.not')}</p>
                        }
                    </>
            }
            {
                modal.state && <Modal
                    header={t('modal.header')}
                    main={t('modal.main')}
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

    @media (width <= 768px) {
        font-size: 16px;
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
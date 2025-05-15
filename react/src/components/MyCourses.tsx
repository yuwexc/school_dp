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
import { User } from "../interfaces/user";
import { Link } from "react-router-dom";

const MyCourses = () => {

    const user = useSelector<RootState, User>((state) => state.user.user);
    const modal = useSelector<RootState, ModalInterface>((state) => state.modal.modal);
    const myCourses = useSelector<RootState, CourseItemInterface[] | null>((state) => state.courses.myCourses);
    const status = useSelector((state: State) => state.courses.status);

    const { t } = useTranslation();

    return (
        <Section $role={user.role?.role_code}>
            <Title $role={user.role?.role_code}>
                {
                    status === 'loading' ?
                        <FieldLoader borderRadius={24} />
                        :
                        t('dashboard.myCourses.title')
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
                                <>
                                    <p>{t('dashboard.myCourses.not')}</p>
                                    {
                                        user.role?.role_code === 'user' && <Link to={'/courses'} style={{ padding: 'unset', fontWeight: 500 }}><span style={{ textDecoration: 'underline' }}>{t('dashboard.myCourses.go')}</span> &#8594;</Link>
                                    }
                                </>
                        }
                        <Look href={'/my-courses'}><span>{t('dashboard.myCourses.view')}</span> &#8594;</Look>
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

const Title = styled.h2<{ $role: string | undefined }>`
    width: 100%;
    text-wrap: nowrap;
    ${props => props.$role == 'teacher' ? 'margin-bottom: 12px' : null};

    @media (width <= 768px) {
        font-size: 16px;
    }
`

const Section = styled.section<{ $role: string | undefined }>`
    display: flex;
    flex-direction: column;
    gap: ${props => props.$role == 'teacher' ? '12px' : '24px'};

    @media (577px <= width <= 768px) {
        gap: ${props => props.$role == 'teacher' ? '12px' : '20px'};
    }

    @media (425px <= width <= 576px) {
        gap: ${props => props.$role == 'teacher' ? '12px' : '16px'};
    }

    @media (425px >= width) {
        gap: ${props => props.$role == 'teacher' ? '12px' : '12px'};
    }
`
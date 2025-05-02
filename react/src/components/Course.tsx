import { FC } from "react";
import styled from "styled-components";
import { CourseItemInterface } from "../interfaces/course";
import Requested from "./Requested";
import Expelled from "./Expelled";
import Enrolled from "./Enrolled";
import CourseLevel from "./CourseLevel";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../interfaces/user";
import { Link } from "react-router-dom";

interface Props {
    course: CourseItemInterface
}

const Course: FC<Props> = ({ course }) => {

    const { t } = useTranslation();

    const user = useSelector<RootState, User>((state) => state.user.user);

    return (
        <Article $role={user.role?.role_code}>
            <div>
                {
                    user.role?.role_code === 'student' && <IMG $src={course.image} />
                }
                <CourseLevel level={course.level} />
                <h2 style={{ textWrap: 'wrap' }}>"{course.course_name.charAt(0).toUpperCase() + course.course_name.slice(1)}"</h2>
                {
                    user.role?.role_code == 'student' &&
                    <Author>{t('dashboard.myCourses.author')} {course.author.first_name + ' ' + course.author.last_name}</Author>
                }
            </div>
            {
                course.access!.access_status === 'requested' && <Requested access={course.access!.id_course_access} />
            }
            {
                course.access!.access_status === 'enrolled' && <Enrolled url={'/my-courses/' + course.id_course} />
            }
            {
                course.access!.access_status === 'expelled' && <Expelled />
            }
            {
                user.role?.role_code === 'teacher' &&
                <Link style={{ color: '#6c5ce7', fontWeight: '600', alignSelf: 'center', marginRight: '6px' }} to={'/teacher/courses/' + course.id_course}>
                    Перейти
                </Link>
            }
        </Article>
    )
}

export default Course;

const Author = styled.p`
    font-size: 24px;
    margin-left: 5px;
`

const IMG = styled.div <{ $src: string | null }>`
    height: 40px;
    min-width: 40px;
    background-image: url(${props => props.$src == '' ? props.$src : '/images/Book-open.svg'});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid lightgray;
    border-radius: 10px;

    @media (576px >= width) {
        display: none;
    }
`

const Article = styled.article<{ $role: string | undefined }>`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 24px;
    padding: 14px;
    background-color: ${props => props.$role == 'teacher' ? 'white' : 'whitesmoke'};
    border-radius: ${props => props.$role == 'student' ? '24px' : '12px'};
    ${props => props.$role == 'teacher' ? 'box-shadow: #d3d3d321 0px 10px 10px 0px;' : null}

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
        text-wrap: nowrap;

        @media (1024px >= width) {
            ${Author} {
                display: none;
            }
        }

        @media (577px <= width <= 768px) {
            & > h2 {
                font-size: 20px;
            }
        }

        @media (425px <= width <= 576px) {
            & > h2 {
                font-size: 16px;
            }
        }

        @media (425px >= width) {
            & > h2 {
                font-size: 16px;
            }
        }
    }

    @media (577px <= width <= 768px) {
        gap: 20px;
    }

    @media (425px <= width <= 576px) {
        flex-direction: column;
        gap: 16px;
    }

    @media (425px >= width) {
        flex-direction: column;
        gap: 12px;
    }
`
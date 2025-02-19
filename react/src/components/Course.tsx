import { FC } from "react";
import styled from "styled-components";
import { CourseItemInterface } from "../interfaces/course";
import Requested from "./Requested";
import Expelled from "./Expelled";
import Enrolled from "./Enrolled";
import CourseLevel from "./CourseLevel";

interface Props {
    course: CourseItemInterface}

const Course: FC<Props> = ({ course }) => {
    return (
        <Article>
            <div>
                <IMG $src={course.image} />
                <CourseLevel level={course.level} />
                <h2>"{course.course_name}"</h2>
                <Author>by {course.author.first_name + ' ' + course.author.last_name}</Author>
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

const Article = styled.article`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 24px;
    padding: 14px;
    background-color: whitesmoke;
    border-radius: 24px;

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
        gap: 16px;
    }

    @media (425px >= width) {
        gap: 12px;
    }
`
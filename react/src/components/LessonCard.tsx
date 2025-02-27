import { FC } from "react";
import { Lesson, MarkColors } from "../interfaces/lesson";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CourseAccessItemInterface from "../interfaces/course_access";

interface Props {
    lesson: Lesson,
    index: number,
    access: CourseAccessItemInterface | null,
    isOpened: () => boolean
}

const LessonCard: FC<Props> = ({ lesson, index, access, isOpened }) => {

    return (
        <Article>
            <Info>
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '14px' }}>
                    <h3>Lesson: {index + 1} {lesson.lesson_name}</h3>
                    {
                        access && access.id_course_access && access.access_status == 'enrolled' && isOpened() &&
                        <Link to={'/lessons/' + lesson.id_lesson}>Перейти</Link>
                    }
                    {
                        lesson.mark &&
                        <Mark $background={MarkColors.get(lesson.mark)!}>{lesson.mark}</Mark>
                    }
                </div>
                <p>{lesson.lesson_description}</p>
                {
                    access && access.id_course_access && access.access_status == 'enrolled' && isOpened() &&
                    <StyledLink to={'/lessons/' + lesson.id_lesson}>Перейти</StyledLink>
                }
            </Info>
        </Article>
    )
}

export default LessonCard;

const StyledLink = styled(Link)`
    display: none;
    color: #8854d0;
    margin-top: 12px;
    text-decoration: underline;

    @media (max-width: 576px) {
        display: block;
    }
`


const Mark = styled.p<{ $background: string }>`
    width: 47.2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${props => props.$background};
    font-size: 24px;

    @media (max-width: 767px) {
        font-size: 18px;
        width: 37.2px;
    }

    @media (max-width: 576px) {
        display: none;
    }
`

const Info = styled.div`
    & > div {
        & > h3, a {
            width: max-content;
            padding: 10px 20px;
            border-radius: 22px;
            font-size: 24px;
            text-wrap: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;

            @media (max-width: 767px) {
                padding: 8px 16px;
            }
        }

        & > h3 {
            background-color: #fdcb6e;
            border: 2px solid #fdcb6e;

            @media (max-width: 767px) {
                font-size: 18px;
            }

            @media (max-width: 576px) {
                width: 100%;
                justify-content: flex-start;
            }

            @media (max-width: 425px) {
                font-size: 16px;
            }
        }

        & > a {
            padding-block: 13px;
            font-size: 18px;
            background-color: unset;
            border: 2px solid #fdcb6e;

            @media (max-width: 767px) {
                font-size: 16px;
                padding-block: unset;
            }

            @media (max-width: 576px) {
                display: none;
            }
        }
    }

    & > p {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.25;

        @media (max-width: 767px) {
            font-size: 16px;
            white-space: break-spaces;
        }
    }
`

const Article = styled.article`
    padding-bottom: 18px;
`
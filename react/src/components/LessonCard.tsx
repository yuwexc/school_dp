import { FC, useEffect } from "react";
import { LessonInterface } from "../interfaces/lesson";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CourseAccessItemInterface from "../interfaces/course_access";

interface Props {
    lesson: LessonInterface,
    index: number,
    access: CourseAccessItemInterface | null,
    isOpened: () => boolean
}

const LessonCard: FC<Props> = ({ lesson, index, access, isOpened }) => {

    useEffect(()=> console.log(window.outerWidth),[]
    )

    return (
        <Article>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '14px' }}>
                <h2>LESSON #{index + 1} "{lesson.lesson_name!.toUpperCase()}" {lesson.mark &&
                    Array.from({ length: lesson.mark }).map(() => <span style={{ display: 'inline-block', fontSize: '22px' }}>&#9889;</span>)}</h2>
                <p>{lesson.lesson_description}</p>
            </div>
            <div>
                {
                    access && access.id_course_access && access.access_status == 'enrolled' && isOpened() &&
                    <Link style={{ color: '#6c5ce7', fontWeight: '600' }} to={'/lessons/' + lesson.id_lesson}>Перейти</Link>
                }
            </div>
        </Article >
    )
}

export default LessonCard

const Article = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #d3d3d3;
`
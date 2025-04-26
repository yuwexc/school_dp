import { FC } from "react";
import { LessonInterface, MarkColors } from "../interfaces/lesson";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CourseAccessItemInterface from "../interfaces/course_access";
import { useTranslation } from "react-i18next";

interface Props {
    lesson: LessonInterface,
    index: number,
    access: CourseAccessItemInterface | null,
    isOpened: () => boolean
}

const LessonCard: FC<Props> = ({ lesson, index, access, isOpened }) => {

    const { t } = useTranslation();

    return (
        <Article>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '14px' }}>
                <h2>{t('course.lesson')} #{index + 1} "{lesson.lesson_name!.toUpperCase()}"</h2>
                <p>{lesson.lesson_description}</p>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {
                    access && access.id_course_access && access.access_status == 'enrolled' && isOpened() &&
                    <Link style={{ color: '#6c5ce7', fontWeight: '600' }} to={'/lessons/' + lesson.id_lesson}>{t('course.go')}</Link>
                }
                {
                    access && access.id_course_access && access.access_status == 'enrolled' && lesson.done != null && <p>|</p>
                }
                {
                    access && access.id_course_access && access.access_status == 'enrolled' && lesson.done && lesson.done.mark ?
                        <p style={{ color: MarkColors.get(lesson.done.mark), fontSize: '24px' }}>{lesson.done.mark}</p>
                        :
                        access && access.id_course_access && access.access_status == 'enrolled' && lesson.done != null ?
                            <p>{t('course.check')}</p>
                            :
                            null
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

    @media (width <= 1024px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
    }
`
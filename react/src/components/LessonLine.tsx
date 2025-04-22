import { FC } from "react";
import { LessonInterface } from "../interfaces/lesson";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
    index: number,
    lesson: LessonInterface
}

const LessonLine: FC<Props> = ({ index, lesson }) => {
    return (
        <Article $status={lesson.lesson_status!}>
            <Flex>
                <Number $status={lesson.lesson_status!}>{index.toString().padStart(2, '0')}</Number>
                <h4>Урок "{lesson.lesson_name!.charAt(0).toUpperCase() + lesson.lesson_name!.slice(1)}" <Span $status={lesson.lesson_status!}>{lesson.lesson_status == 2 ? 'опубликован' : 'на модерации'}</Span></h4>
                {
                    lesson.lesson_status == 2 &&
                    <Link style={{ color: '#6c5ce7', fontWeight: '600' }} to={'/lessons/' + lesson.id_lesson}>— перейти к уроку</Link>
                }
                {
                    lesson.lesson_status == 2 &&
                    <Link style={{ color: '#d63031', fontWeight: '600' }} to={'/lessons/' + lesson.id_lesson + '/unmarked'}>— проверить ответы студентов</Link>
                }
            </Flex>
            <p><span style={{ fontWeight: 'bold' }}>Описание:</span> {lesson.lesson_description}</p>
            <Flex style={{ flexWrap: 'wrap' }}>
                <p style={{ color: 'gray', fontSize: '12px' }}>Создан: {lesson.created_at!.toString().slice(8, 10) + '.' + lesson.created_at!.toString().slice(5, 7) + '.' + lesson.created_at!.toString().slice(0, 4)}</p>
                {
                    lesson.lesson_status == 2 &&
                    <p style={{ color: 'gray', fontSize: '12px' }}>Опубликован: {lesson.updated_at!.toString().slice(8, 10) + '.' + lesson.updated_at!.toString().slice(5, 7) + '.' + lesson.updated_at!.toString().slice(0, 4)}</p>
                }
            </Flex>
        </Article>
    )
}

export default LessonLine;

const Span = styled.span<{ $status: number }>`
    color: ${props => props.$status == 2 ? '#20bf6b' : '#fa8231'};
`

const Number = styled.p<{ $status: number }>`
    background-color: ${props => props.$status == 2 ? '#20bf6b' : '#f7b731'};
    border-radius: 6px;
    padding: 6px;
    color: white;

    @media (max-width: 576px) {
        display: none;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
`

const Article = styled.article<{ $status: number }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: 12px;
    padding: 12px;
    background-color: ${props => props.$status == 2 ? '#eafaf1' : '#fdebd0'};
    border: 1px solid ${props => props.$status == 2 ? '#20bf6b' : '#f7b731'};
    border-radius: 12px;

    @media (max-width: 576px) {
        padding: 20px;
    }
`
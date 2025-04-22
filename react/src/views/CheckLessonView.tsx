import styled, { keyframes } from "styled-components";
import { fetchLesson } from "../features/lessonSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { LessonInterface } from "../interfaces/lesson";
import { State } from "../interfaces/requests";

const CheckLessonView = () => {

    const { id } = useParams<{ id: string }>();

    const lesson = useSelector<RootState, LessonInterface | null>((state) => state.lesson.lesson);
    const status = useSelector((state: State) => state.lesson.status);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        dispatch(fetchLesson(id!));

    }, [dispatch, id]);

    return (
        <StyledMain>
            {
                status === 'loading' &&
                <>
                    <Loader $height={318} />
                    <Loader $height={160} />
                    <Loader $height={230} />
                </>
            }
            {
                status === 'succeeded' && lesson &&
                <>
                    <Intro>
                        <Flex>
                            <Title>Урок "{lesson.lesson_name}"</Title>
                        </Flex>
                    </Intro>
                    {
                        lesson.unchecked_list?.length != 0 ?
                            <Intro>
                                <Flex>
                                    <Title>Необходимо проверить ответы студентов</Title>
                                </Flex>
                                {
                                    lesson.unchecked_list?.map((item, index) =>
                                        <Done key={index}>
                                            <h4>{item.student?.last_name} {item.student?.first_name}</h4>
                                            <p>время ответа: {item.time_end.toString().slice(8, 10) + '.' + item.time_end!.toString().slice(5, 7) + '.' + item.time_end!.toString().slice(0, 4)} {item.time_end.toString().slice(-8)}</p>
                                            <Link style={{ color: '#6c5ce7', fontWeight: '600', marginLeft: 'auto' }} to={'/user/' + item.student?.id_user + '/completed-lessons/' + item.lesson_id + '/check'}>— проверить ответ</Link>
                                        </Done>
                                    )
                                }
                            </Intro>
                            :
                            <Intro>
                                <Flex>
                                    <p>Студенты еще не выполнили урок</p>
                                </Flex>
                            </Intro>
                    }
                </>
            }
        </StyledMain>
    )
}

export default CheckLessonView;

const Done = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #a29bfe52;
    border-radius: 12px;

    @media (max-width: 576px) {
        padding: 20px;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    @media (max-width: 767px) {
        flex-direction: column;
        justify-content: unset;
        align-items: flex-start;
    }
`

const Title = styled.h2`
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    word-break: break-word;

    @media (max-width: 1279px) {
        font-size: 32px;
    }

    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const Intro = styled.section`
    width: calc(100% - 64px);
    max-width: 1304px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 32px;
    gap: 20px;
    border-radius: 24px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 12px;
        padding: 24px;
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: white;

    @media (577px <= width <= 768px) {
        padding: 24px;
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
        gap: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
        gap: 12px;
    }
`

const LoaderAnimation = keyframes`
    0% {
        background-position: right;
    }
`

const Loader = styled.div<{ $height: number }>`
    width: 100%;
    height: ${props => props.$height}px;
    border-radius: 18px;
    display: inline-block;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${LoaderAnimation} 1.75s infinite linear;
`
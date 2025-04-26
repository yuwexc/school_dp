import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Exercise, LessonInterface, TheoryBodyItem } from "../interfaces/lesson";
import { getStudentAnswer, postFeedback } from "../features/lessonSlice";
import LessonTranslationExerciseCheckView from "../components/LessonTranslationExerciseCheckView";
import { Feedback } from "../interfaces/done";
import { Button, Error } from "../styles/forms";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

const CheckLessonStudentAnswer = () => {

    const { user, id } = useParams();
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();
    const lesson = useSelector<RootState, LessonInterface | null>((state) => state.lesson.lesson);
    const status = useSelector<RootState, string | null>((state) => state.lesson.status);

    const [studentAnswer, setStudentAnswer] = useState<Exercise[]>([]);
    const [lessonBody, setLessonBody] = useState<Exercise[]>([]);
    const [feedback, setFeedback] = useState<Map<number, Feedback[]>>(new Map());
    const [check, setCheck] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getStudentAnswer({
            user: user!,
            id: id!
        }))
    }, [dispatch, id, user]);

    useEffect(() => {
        if (lesson?.done?.st_answer) {
            setStudentAnswer(JSON.parse(lesson.done.st_answer))
        }
        if (lesson?.lesson_body) {
            setLessonBody(JSON.parse(lesson.lesson_body)[0].filter((item: TheoryBodyItem) => item.type != 'THEORY'));
        }
    }, [lesson]);

    const addFeedback = (item: Feedback[]) => {
        setFeedback(prevFeedback => {
            const newFeedback = new Map(prevFeedback);
            newFeedback.set(item[0].id, item);
            return newFeedback;
        });
    }

    const [summaryFeedback, setSummaryFeedback] = useState<Feedback[][]>([]);

    const sendFeedback = () => {
        Array.from(feedback).forEach(element => {
            setSummaryFeedback(prevState => [...prevState, element[1]]);
        });

        setSummaryFeedback(prevState => prevState.sort((a, b) => a[0].id - b[0].id));
        setCheck(true);
    }

    useEffect(() => {
        if (check && summaryFeedback.length != 0) {
            let maxStudentScore: number = 0;

            for (let index = 0; index < summaryFeedback.length; index++) {
                const exercise = summaryFeedback[index];
                for (let index = 0; index < exercise.length; index++) {
                    const element = exercise[index];
                    maxStudentScore = maxStudentScore + Number(element.student_score);
                }
            }

            let maxScore: number = 0;

            for (let index = 0; index < lessonBody.length; index++) {
                const exercise = lessonBody[index];
                for (let index = 0; index < exercise.tasks.length; index++) {
                    const task = exercise.tasks[index];
                    maxScore = maxScore + task.score;
                }
            }

            const progress: number = maxStudentScore / maxScore * 100;
            let mark: number;

            if (progress >= 90) {
                mark = 5;
            } else if (progress >= 75 && progress < 90) {
                mark = 4;
            } else if (progress >= 50 && progress < 75) {
                mark = 3;
            } else {
                mark = 2;
            }

            dispatch(postFeedback({
                id: id!,
                user: user!,
                feedback: summaryFeedback,
                mark: mark!,
                score: maxStudentScore
            })).then(() => navigate(-1))
        }
    }, [check, summaryFeedback]);

    return (
        <StyledMain>
            {
                status === 'loading' &&
                <>
                    <StartLoader $height={160} />
                    <StartLoader $height={190} />
                    <StartLoader $height={200} />
                </>
            }
            {
                status === 'succeeded' && lesson && lesson.done?.mark == null &&
                <>
                    <Intro>
                        <Flex>
                            <Title>Урок "{lesson.lesson_name}"</Title>
                            <h2 style={{ textWrap: 'nowrap' }}>Ответ ученика: {lesson.done?.student?.first_name} {lesson.done?.student?.last_name}</h2>
                        </Flex>
                    </Intro>
                    <Intro>
                        {
                            lesson.done && studentAnswer && studentAnswer
                                .sort((a: Exercise, b: Exercise) => a.id - b.id)
                                .map((item: Exercise, index) =>
                                    <LessonTranslationExerciseCheckView
                                        item={item}
                                        addFeedback={addFeedback}
                                        key={index} />
                                )
                        }
                    </Intro>
                </>
            }
            {
                lesson && lesson.done?.mark == null &&
                <Intro>
                    <Flex style={{ justifyContent: 'space-between' }}>
                        <Title>Готово?</Title>
                        {
                            status == 'loading' ? <Button disabled><Loader /></Button> :
                                <Button onClick={sendFeedback}>Отправить отзыв</Button>
                        }
                        {
                            status === 'failed' && <Error>{t('error')}</Error>
                        }
                    </Flex>
                </Intro>
            }
            {
                status === 'succeeded' && lesson && lesson.done?.mark &&
                <Intro>
                    <p>Вы уже проверили урок "{lesson.lesson_name}" у студента {lesson.done?.student?.first_name} {lesson.done?.student?.last_name}</p>
                    <Button onClick={() => navigate(-1)}>Назад</Button>
                </Intro>
            }
        </StyledMain>
    )
}

export default CheckLessonStudentAnswer;

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

const StartLoader = styled.div<{ $height: number }>`
    width: 100%;
    height: ${props => props.$height}px;
    border-radius: 18px;
    display: inline-block;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${LoaderAnimation} 1.75s infinite linear;
`
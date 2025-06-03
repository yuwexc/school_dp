import styled from "styled-components";
import { Button, Input, Message } from "../styles/forms";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Exercise } from "../interfaces/lesson";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "./LessonWordsSection";
import { Done, Feedback } from "../interfaces/done";
import { LessonSectionTitle } from "../styles/lesson";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../interfaces/user";

interface Props {
    exercise: Exercise
    setDone?: Dispatch<SetStateAction<Exercise[]>>,
    done?: Done,
    savedExercises: Set<number>,
    setSavedExercises: Dispatch<SetStateAction<Set<number>>>

}

const LessonTranslationExerciseStudentView: FC<Props> = ({ exercise, setDone, done, savedExercises, setSavedExercises }) => {

    const user = useSelector<RootState, User>((state) => state.user.user);

    const { register, handleSubmit } = useForm<FormData>();
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (done) return;
        setIsSaved(true);
        Object.values(data).forEach((answer, index) => {
            const current_task = exercise.tasks[index];
            if (current_task) {
                current_task.answer = answer;
                if (current_task.answer.length == 0) {
                    current_task.student_score = 0;
                }
                if (current_task.english && current_task.answer === current_task.english) {
                    current_task.student_score = current_task.score;
                }
            }
        });

        setDone!(prevState => [...prevState.filter(item => item.id != exercise.id), exercise]);

        setSavedExercises(prev => new Set(prev).add(exercise.id));
    }

    const [doneBody, setDoneBody] = useState<Exercise[]>([]);
    const [feedback, setFeedback] = useState<Feedback[][]>([]);

    useEffect(() => {
        if (done) {
            setDoneBody(JSON.parse(done.st_answer));
            setFeedback(JSON.parse(done.feedback!));
        }
    }, [done]);

    return (
        <Section>
            <LessonSectionTitle style={{ color: '#fa8231' }}>PRACTICE</LessonSectionTitle>
            {
                user.role?.role_code != 'teacher' && !done ?
                    <Name style={{
                        color: savedExercises.has(exercise.id) ? 'unset' : 'red'
                    }}>{exercise.name}. {exercise.description} {!savedExercises.has(exercise.id) && '(не сохранено)'}</Name>
                    :
                    <Name >{exercise.name}. {exercise.description}</Name>
            }
            <Form onSubmit={handleSubmit(onSubmit)}>
                {
                    exercise.tasks.map(task =>
                        <div key={task.id}>
                            <Task $student_score={doneBody.find(item => item.id == exercise.id)?.tasks[task.id].student_score}>
                                <Number>{(task.id + 1).toString().padStart(2, '0')}</Number>
                                <p style={{ fontSize: '24px' }}>{task.russian}</p>
                            </Task>
                            {
                                doneBody.length == 0 && !doneBody.find(item => item.id == exercise.id) ?
                                    <Input disabled={isSaved} {...register(`english-${task.id}`)} type="text" placeholder="Ваш ответ" id={'english-' + task.id} />
                                    :
                                    <>
                                        <Input disabled value={doneBody.find(item => item.id == exercise.id)?.tasks[task.id].answer || 'Ответ отсутствует'} type="text" id={'english-' + task.id} />
                                        {
                                            feedback && feedback.find(item => item[0].id == exercise.id)?.find(item => item.id == task.id)?.english &&
                                            <>
                                                <p>Комментарий преподавателя:</p>
                                                <Input disabled value={feedback.find(item => item[0].id == exercise.id)?.find(item => item.id == task.id)?.english || ''} type="text" id={'feedback-' + task.id} />
                                            </>
                                        }
                                        {
                                            feedback && <p style={{ color: '#6c5ce7' }}>Балл: {feedback.find(item => item[0].id == exercise.id)?.find(element => feedback.find(item => item[0].id == exercise.id)?.indexOf(element) == task.id)?.student_score} из {task.score}</p>
                                        }
                                    </>
                            }
                        </div>
                    )
                }
                {
                    user.role?.role_code != 'teacher' && doneBody.length == 0 && feedback.length == 0 && !isSaved && <Message style={{ fontWeight: '600' }}>Обязательно сохраните данные!</Message>
                }
                {
                    user.role?.role_code != 'teacher' && !isSaved && feedback && feedback.length == 0 && <Button style={{ backgroundColor: '#fa8231' }} type="submit">Сохранить</Button>
                }
            </Form>
        </Section>
    )
}

export default LessonTranslationExerciseStudentView;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 18px;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
`

const Task = styled.div<{ $student_score: number | undefined }>`
    display: flex;
    align-items: center;
    gap: 12px;

    & > p:first-child {
        background-color: ${props => typeof props.$student_score == 'undefined' ? '#fa8231' : (props.$student_score == 0 ? '#d91e18' : '#20bf6b')};
    }

    & + input {
        color: ${props => typeof props.$student_score == 'undefined' ? '#2d2d2d' : (props.$student_score == 0 ? '#d91e18' : '#20bf6b')};
    }

    @media (max-width: 426px) {
        & > p {
            font-size: 20px !important;
        }
    }
`

const Number = styled.p`
    border-radius: 6px;
    padding: 8px;
    color: white;
    font-size: 20px;
    font-variant-numeric: tabular-nums;

    @media (max-width: 426px) {
        display: none;
    }
`

const Name = styled.h3`
    font-size: 30px;

    @media (max-width: 426px) {
        font-size: 24px;
    }
`

const Section = styled.section`
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;

    @media (max-width: 1024px) {
        padding: 60px;
    }

    @media (max-width: 768px) {
        padding: 50px 40px;
    }

    @media (max-width: 426px) {
        padding: 30px 24px;
    }
`
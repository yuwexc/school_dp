import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Exercise } from "../interfaces/lesson";
import styled from "styled-components";
import { Input, Message, Select } from "../styles/forms";
import { t } from "i18next";
import { Feedback } from "../interfaces/done";
import SavingBlock from "./SavingBlock";

interface Props {
    item: Exercise,
    addFeedback: (item: Feedback[]) => void
}

const LessonTranslationExerciseCheckView: FC<Props> = ({ item, addFeedback }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<{ [key: string]: string }>();

    const [isSaved, setIsSaved] = useState<boolean>(false);

    const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
        function transformData(input: { [key: string]: string }): Feedback[] {
            const result: Feedback[] = [];
            let englishIndex = 0;

            for (const key in input) {
                if (key.startsWith('english-')) {
                    result.push({
                        id: item.id,
                        english: input[key],
                        student_score: input[`student_score-${englishIndex}`]
                    })
                    englishIndex++;
                }
            }

            return result;
        }

        const output = transformData(data);
        addFeedback(output);
        setIsSaved(true);
    }


    return (
        <Form key={item.id} onSubmit={handleSubmit(onSubmit)}>
            <h2>{item.name}</h2>
            <h3>{item.description}</h3>
            {
                item.tasks.map(task =>
                    <div key={task.id}>
                        <Task $student_score={task.student_score}>
                            <p style={{ fontSize: '18px', color: '#1B1464' }}>{task.id + 1}&#41; {task.russian}</p>
                        </Task>
                        <p>Ответ студента: <span>{task.answer || 'нет ответа'}</span></p>
                        <Input {...register('english-' + task.id)} placeholder={'Напишите ответ и объяснение (если это необходимо)'} type="text" id={'english-' + task.id} />
                        <p>Балл:</p>
                        <Select {...register('student_score-' + task.id, {
                            required: {
                                value: true,
                                message: t('sign_up.empty')
                            },
                            value: task.student_score?.toString()
                        })} id={'student_score-' + task.id}>
                            {
                                Array.from({ length: task.score + 1 }).map((_, index) =>
                                    <option value={index} key={index}>&#11088;{index}</option>)
                            }
                        </Select>
                        {
                            errors && <Message>{errors.student_score?.message}</Message>
                        }

                    </div>
                )
            }
            <SavingBlock
                isSaved={isSaved}
                add={() => { }}
                addButton={false}
            />
        </Form>
    )
}

export default LessonTranslationExerciseCheckView;

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

    & + p > span {
        color: ${props => typeof props.$student_score == 'undefined' ? '#2d2d2d' : (props.$student_score == 0 ? '#d91e18' : '#20bf6b')};
    }
`
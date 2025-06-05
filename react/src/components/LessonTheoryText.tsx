import { Dispatch, FC, JSXElementConstructor, ReactElement, SetStateAction, useState } from "react";
import styled from "styled-components";
import LessonSectionHeader from "./LessonSectionHeader";
import { LessonText, TableInterface } from "../interfaces/lesson";
import { Button, Input, Message } from "../styles/forms";
import { FormData } from "./LessonWordsSection";
import { SubmitHandler, useForm } from "react-hook-form";
import { ElementProps } from "../views/CreateLessonView";

interface Props {
    id: number,
    type: string,
    color: string,
    deleteHeaderElement: (id: number) => void,
    displayedHeaderElements: ReactElement<ElementProps, string | JSXElementConstructor<unknown>>[],
    setTheory: Dispatch<SetStateAction<(TableInterface | LessonText)[]>>
}

const LessonTheoryText: FC<Props> = ({ id, color, deleteHeaderElement, displayedHeaderElements, setTheory }) => {

    const { register, handleSubmit, formState: { errors }, unregister } = useForm<FormData>();

    const [isSaved, setIsSaved] = useState<boolean>(false);

    const deleteText = () => {
        unregister('text-' + id)
        setTheory(prevState => prevState.filter(item => item.id != id));
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setTheory(prevState => [
            ...prevState.filter(item => item.id !== id),
            {
                id: displayedHeaderElements.length,
                type: 'TEXT',
                text: data[`text-${id}`]
            }
        ]);

        setIsSaved(true);
    }

    return (
        <Article $color={color + '3d'}>
            <LessonSectionHeader id={id} deleteElement={deleteHeaderElement} reset={deleteText} title={'Текст'} />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register(`text-${id}`, {
                    required: {
                        value: true, message: 'Заполните поле'
                    }
                })}
                    onChange={() => setIsSaved(false)}
                    type="text" placeholder={"Введите текст"} id={'text-' + id} />
                {
                    errors[`text-${id}`] && <Message>{errors[`text-${id}`]?.message}</Message>
                }
                {
                    !isSaved ?
                        <FlexRow>
                            <Message style={{ fontWeight: '600', alignSelf: 'center' }}>Обязательно сохраните данные!</Message>
                        </FlexRow>
                        : null
                }
                <Button disabled={isSaved} type="submit" style={{ backgroundColor: color, minWidth: 'unset' }}>Сохранить</Button>
            </Form>
        </Article>
    )
}

export default LessonTheoryText;

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Article = styled.article<{ $color: string }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${props => props.$color};
    padding: 32px;
    border-radius: 10px;
`
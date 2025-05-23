import styled from "styled-components";
import { Input, Message } from "../styles/forms";
import { SentenceLineInterface } from "./LessonTranslationExercise";
import { Dispatch, FC, SetStateAction } from "react";
import { FieldErrors, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { FormData } from "./LessonWordsSection";
import { ActionButton } from "./LineWord";
import { useTranslation } from "react-i18next";

interface Props {
    id: number,
    sentenceLines: SentenceLineInterface[],
    setSentenceLines: Dispatch<SetStateAction<SentenceLineInterface[]>>,
    register: UseFormRegister<FormData>,
    errors: FieldErrors<FormData>,
    unregister: UseFormUnregister<FormData>
}

const SentenceLine: FC<Props> = ({ id, sentenceLines, setSentenceLines, register, errors, unregister }) => {

    const handleDelete = (id: number) => {
        if (sentenceLines.length === 1) return;

        setSentenceLines((prevElements) =>
            prevElements.filter((element) => element.id !== id)
        );

        unregister(`russian-sentence-${id}`);
        unregister(`english-sentence-${id}`);
        unregister(`score--${id}`);
    }

    const { t } = useTranslation();

    return (
        <Line>
            <div>
                <Input {...register(`russian-sentence-${id}`, {
                    required: {
                        value: true, message: t('sign_up.empty')
                    },
                    pattern: {
                        value: /^[А-Яа-яЁё\s,.!?;:—"'’()-]+$/,
                        message: t('sign_up.incorrect')
                    }
                })}
                    type="text" placeholder="Предложение на русском" id={'russian-sentence' + id}></Input>
                {
                    errors[`russian-sentence-${id}`] && <Message>{errors[`russian-sentence-${id}`]?.message}</Message>
                }
            </div>
            <div>
                <Input {...register(`english-sentence-${id}`, {
                    pattern: {
                        value: /^[a-zA-Z\s-\d]+$/i,
                        message: t('sign_up.incorrect')
                    }
                })} type="text" placeholder="Ответ" id={'english-sentence' + id}></Input>
                {
                    errors[`english-sentence-${id}`] && <Message>{errors[`english-sentence-${id}`]?.message}</Message>
                }
            </div>
            <div>
                <Input {...register(`score--${id}`, {
                    required: {
                        value: true, message: t('sign_up.empty')
                    },
                    pattern: {
                        value: /^[\d]+$/,
                        message: t('sign_up.incorrect')
                    }
                })} type="number" min={1} placeholder="Балл за правильный ответ" id={'score' + id}></Input>
                {
                    errors[`score--${id}`] && <Message>{errors[`score--${id}`]?.message}</Message>
                }
            </div>
            <ActionBlock>
                <DeleteButton onClick={() => handleDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.4px" height="26.4px" viewBox="0 0 24 24" fill="none">
                        <path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="white" />
                        <path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="white" />
                        <path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="white" />
                    </svg>
                </DeleteButton>
            </ActionBlock>
        </Line>
    )
}

export default SentenceLine;

const DeleteButton = styled(ActionButton)`
    & > svg {
        background-color: #d91e18;
    }

    &:disabled {
        cursor: unset;

        & > svg {
            background-color: #d65854;
        }
    }
`

const ActionBlock = styled.div`
    flex-direction: row !important;
    flex-grow: unset !important;
    justify-content: flex-end !important;
`

const Line = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;

    & > div {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    @media (width < 1024px) {
        flex-direction: column;
        align-items: stretch;
    }
`
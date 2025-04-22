import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import LineWord, { ActionButton } from "./LineWord";
import { SubmitHandler, useForm } from "react-hook-form";
import { Word } from "../interfaces/lesson";
import SavingBlock from "./SavingBlock";
import LessonSectionHeader from "./LessonSectionHeader";

interface Props {
    id: number,
    type: string,
    addWord: (newWord: Word) => void,
    resetLessonWords: () => void,
    deleteElement: (id: number) => void,
}

export interface FormData {
    [key: string]: string
}

export interface WordLine {
    id: number
}

const LessonWordsSection: FC<Props> = ({ id, addWord, resetLessonWords, deleteElement }) => {

    const { register, handleSubmit, formState: { errors }, unregister } = useForm<FormData>();

    const [isSaved, setIsSaved] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {

        resetLessonWords();

        const transformData = (data: FormData): FormData[] => {
            return Object.entries(data).reduce((acc: FormData[], [key, value]) => {
                const index = parseInt(key.split('-')[1], 10);
                acc[index] = acc[index] || {};
                acc[index][key] = value;
                return acc;
            }, Array.from({ length: Object.keys(data).length / 3 }, () => ({})));

        };

        const result = transformData(data);

        let i = 0;

        result.forEach((word: FormData, index: number) => {
            if (Object.keys(word).length === 0) {
                return;
            } else {
                addWord({
                    id: i,
                    english: word['english-' + index].charAt(0).toUpperCase() + word['english-' + index].slice(1),
                    transcription: '[' + word['transcription-' + index].split('').filter(item => item != '[' && item != ']').join('') + ']',
                    russian: word['russian-' + index].charAt(0).toUpperCase() + word['russian-' + index].slice(1)
                })
                i++;
            }
        });

        setIsSaved(true);
    }

    const [wordLines, setWordLines] = useState<WordLine[]>([
        {
            id: 0
        }
    ]);

    const addLine = () => {
        setWordLines(prevState => [...prevState, { id: wordLines[wordLines.length - 1].id + 1 }]);
    }

    useEffect(() => setIsSaved(false), [wordLines]);

    return (
        <Intro>
            <LessonSectionHeader id={id} title={'Слова к уроку'} deleteElement={deleteElement} reset={resetLessonWords} />
            <p>В этом разделе укажите английские слова, используемые на уроке, их транскрипцию и перевод на русский язык. Включите все ключевые слова и фразы, которые будут изучаться или использоваться на занятии. Для большей ясности, можете также указать часть речи (существительное, глагол, прилагательное и т.д.) для каждого слова.</p>
            <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
                {
                    wordLines.map((line, index) =>
                        <LineWord
                            id={line.id}
                            wordLines={wordLines}
                            setWordLines={setWordLines}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            key={index}
                        />)
                }
                <SavingBlock
                    isSaved={isSaved}
                    add={addLine}
                />
            </Flex>
        </Intro >
    )
}

export default LessonWordsSection;

export const AddButton = styled(ActionButton)`
    & > svg {
        background-color: #2d2d2d;
    }

    &:disabled {
        cursor: unset;

        & > svg {
            background-color: gray;
        }
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
`

const Intro = styled.section`
    width: calc(100% - 64px);
    max-width: 1338px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 32px;
    gap: 20px;
    border-radius: 32px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 16px;
        border-radius: 24px;
        padding: 24px;
    }
`
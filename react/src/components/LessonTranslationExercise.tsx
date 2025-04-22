import { FC, JSXElementConstructor, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Message, Title } from "../styles/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "./LessonWordsSection";
import SentenceLine from "./SentenceLine";
import SavingBlock from "./SavingBlock";
import { Exercise, Sentence } from "../interfaces/lesson";
import { ElementProps } from "../views/CreateLessonView";
import LessonSectionHeader from "./LessonSectionHeader";

interface Props {
    id: number,
    type: string,
    addExercise: (newExercise: Exercise) => void,
    deleteLessonExercise: (id: number) => void,
    deleteElement: (id: number) => void,
    displayedElements: ReactElement<ElementProps, string | JSXElementConstructor<unknown>>[]
}

export interface SentenceLineInterface {
    id: number
}

const LessonTranslationExercise: FC<Props> = ({ id, addExercise, deleteElement, deleteLessonExercise, displayedElements }) => {

    const { register, handleSubmit, formState: { errors }, unregister } = useForm<FormData>();

    const [name, setName] = useState<string>('Упражнение #' + (displayedElements.filter(item => item.props.type == 'TRANSLATION_EXERCISE').length + 1));
    const [description, setDescription] = useState<string>('');
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [sentenceLines, setSentenceLines] = useState<SentenceLineInterface[]>([
        {
            id: 0
        }
    ]);

    const onSubmit: SubmitHandler<FormData> = (data) => {

        const sentences: Sentence[] = [];

        const transformData = (data: FormData): FormData[] => {
            return Object.entries(data).reduce((acc: FormData[], [key, value]) => {
                const index = parseInt(key.split('-')[2], 10);
                acc[index] = acc[index] || {};
                acc[index][key] = value;
                return acc;
            }, Array.from({ length: Object.keys(data).length / 3 }, () => ({})));

        };

        const result = transformData(data);

        let i = 0;

        result.forEach((sentence: FormData, index: number) => {
            if (Object.keys(sentence).length === 0) {
                return;
            } else {
                sentences.push({
                    id: i,
                    russian: sentence['russian-sentence-' + index].charAt(0).toUpperCase() + sentence['russian-sentence-' + index].slice(1),
                    english: sentence['english-sentence-' + index].charAt(0).toUpperCase() + sentence['english-sentence-' + index].slice(1),
                    score: Number(sentence['score--' + index])
                });
                i++;
            }
        });

        addExercise({
            id: id,
            type: 'TRANSLATION_EXERCISE',
            name: name || 'Упражнение №' + (displayedElements.filter(item => item.props.type == 'TRANSLATION_EXERCISE').length + 1),
            description: description || '',
            tasks: sentences
        });

        setIsSaved(true);
    }

    const addSentence = () => {
        setSentenceLines(prevState => [...prevState, { id: sentenceLines[sentenceLines.length - 1].id + 1 }]);
    }

    useEffect(() => setIsSaved(false), [sentenceLines]);

    return (
        <Intro>
            <LessonSectionHeader id={id} title={'Упражнение на перевод'} deleteElement={deleteElement} reset={deleteLessonExercise} />
            <Title style={{ fontSize: '20px' }}>Название упражнения</Title>
            <Input value={name} onChange={(e) => setName(e.target.value)} id={"exercise-name-" + id}></Input>
            <Title style={{ fontSize: '20px' }}>Описание упражнения</Title>
            <Input as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id={"exercise-description-" + id}
                rows={4}
                style={{ outline: 0, resize: 'vertical' }}
            ></Input>
            <Title style={{ fontSize: '20px' }}>Содержание упражнения</Title>
            <Message style={{ maxWidth: 'unset', fontWeight: '600' }}>Если ответ имеет только одну форму, введите его в поле ответа, система автоматически сверит его с ответом студента и выставит балл. Если ответ может быть разным, оставьте поле пустым</Message>
            <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
                {
                    sentenceLines.map((line, index) =>
                        <SentenceLine
                            id={line.id}
                            sentenceLines={sentenceLines}
                            setSentenceLines={setSentenceLines}
                            register={register}
                            errors={errors}
                            unregister={unregister}
                            key={index}
                        />)
                }
                <SavingBlock
                    isSaved={isSaved}
                    add={addSentence}
                />
            </Flex>
        </Intro>
    )
}

export default LessonTranslationExercise;

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
        gap: 12px;
        border-radius: 24px;
        padding: 24px;
    }
`
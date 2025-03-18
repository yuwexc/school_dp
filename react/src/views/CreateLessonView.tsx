import styled from "styled-components";
import { Button, Input, Title } from "../styles/forms";
import { ReactElement, useState } from "react";
import LessonWordsSection from "../components/LessonWordsSection";
import { Exercise, Word } from "../interfaces/lesson";
import LessonTranslationExercise from "../components/LessonTranslationExercise";

export interface ElementProps {
    id: number,
    type: string
}

const CreateLessonView = () => {

    const current_date: Date = new Date();
    const date: string = current_date.getDate().toString() + '.' + (current_date.getMonth() + 1).toString().padStart(2, '0') + '.' + current_date.getFullYear().toString();

    const [lessonName, setLessonName] = useState<string>('Урок от ' + date);
    const [lessonDescription, setLessonDescription] = useState<string>('');
    const [lessonWords, setLessonWords] = useState<Word[]>([]);
    const [lessonExercises, setLessonExercises] = useState<Exercise[]>([]);

    const [displayedElements, setDisplayedElements] = useState<ReactElement<ElementProps>[]>([]);
    const [newElementId, setNewElementId] = useState(0);

    const deleteElement = (id: number) => {
        setDisplayedElements((prevElements) =>
            prevElements.filter((element) => element.props.id !== id)
        );
    };

    const addWord = (newWord: Word) => {
        setLessonWords((prevElements) => {
            return [...prevElements, newWord]
        });
    }

    const addExercise = (newExercise: Exercise) => {
        setLessonExercises(prevState => [...prevState, newExercise]);
    }

    const resetLessonWords = () => {
        setLessonWords([]);
    }

    const deleteLessonExercise = (id: number) => {
        setLessonExercises(prevState => prevState.filter(item => item.id != id));
    }

    const elements = new Map<string, ReactElement<ElementProps>>([
        ['LESSON_WORDS', <LessonWordsSection
            id={newElementId}
            key={newElementId}
            type='LESSON_WORDS'
            addWord={addWord}
            resetLessonWords={resetLessonWords}
            deleteElement={() => deleteElement(newElementId)}
        />],
        ['THEORY', ],
        ['TRANSLATION_EXERCISE', <LessonTranslationExercise
            id={newElementId}
            key={newElementId}
            type='TRANSLATION_EXERCISE'
            addExercise={addExercise}
            deleteLessonExercise={deleteLessonExercise}
            deleteElement={() => deleteElement(newElementId)}
            displayedElements={displayedElements}
        />]
    ])

    const addLessonSection = (type: string) => {
        setDisplayedElements((prevElements) => [
            ...prevElements,
            elements.get(type)!
        ]);

        setNewElementId((prevState) => prevState + 1);

        setTimeout(() => window.scrollTo({
            top: document.body.offsetHeight,
            left: 0,
            behavior: "smooth"
        }), 100);
    };

    const saveLesson = () => {
        const lesson = {
            lesson_name: lessonName || 'Урок от ' + date,
            lesson_description: lessonDescription || '',
            lesson_body: {
                "lesson_words": lessonWords,
                "lesson_exercises": lessonExercises
            }
        }

        console.log(lesson);
    }

    return (
        <StyledMain>
            <Intro>
                <Title>Название урока</Title>
                <p>Название должно быть коротким, информативным и привлекательным. Отразите основную тему урока. Примеры: "Present Simple: Practice", "Reading Comprehension: Short Stories", "English Vocabulary: Food". Избегайте длинных и сложных формулировок.</p>
                <Input value={lessonName} onChange={(e) => setLessonName(e.target.value)} id="lesson_name"></Input>
            </Intro>
            <Intro>
                <Title>Описание урока</Title>
                <p>Сформулируйте краткое описание того, чему научится ученик на уроке. Укажите ключевые навыки или знания, которые он приобретет. Избегайте подробного описания процесса обучения – сконцентрируйтесь на результате.</p>
                <Input as="textarea"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    id="lesson_description"
                    rows={4}
                    style={{ outline: 0, resize: 'vertical' }}
                ></Input>
            </Intro>
            {
                displayedElements.length > 0 && displayedElements.map(element => element)
            }
            <Intro>
                <Flex>
                    <p>Добавить:</p>
                    <ActonButton onClick={() => addLessonSection('LESSON_WORDS')}
                        disabled={displayedElements.includes(displayedElements.find(item => item.props.type === 'LESSON_WORDS')!)}>
                        Слова к уроку
                    </ActonButton>
                    <ActonButton onClick={() => addLessonSection('')}
                        disabled={displayedElements.includes(displayedElements.find(item => item.props.type === '')!)}>
                        Теорию
                    </ActonButton>
                    <ActonButton onClick={() => addLessonSection('TRANSLATION_EXERCISE')}>
                        Упражнение на перевод
                    </ActonButton>
                </Flex>
            </Intro>
            <Intro>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <Title>Готово?</Title>
                    <Button onClick={saveLesson}>Сохранить урок*</Button>
                </Flex>
            </Intro>
            <p>*перед публикацией урок проверяется модераторами, он будет доступен в ближайшее время</p>
        </StyledMain >
    )
}

export default CreateLessonView;

const ActonButton = styled(Button)`
    min-width: unset;
`

const Flex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;

    @media (max-width: 767px) {
        flex-direction: column;
        justify-content: unset;
        align-items: flex-start;
    }
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

const StyledMain = styled.main`
    height: 100%;
    padding: 24px;
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
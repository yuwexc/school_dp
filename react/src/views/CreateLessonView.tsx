import styled from "styled-components";
import { Button, Error, Input, Title } from "../styles/forms";
import { ReactElement, useEffect, useState } from "react";
import LessonWordsSection from "../components/LessonWordsSection";
import { Exercise, Theory, Word } from "../interfaces/lesson";
import LessonTranslationExercise from "../components/LessonTranslationExercise";
import LessonTheory from "../components/LessonTheory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { State } from "../interfaces/requests";
import { postLesson } from "../features/lessonSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { User } from "../interfaces/user";

export interface ElementProps {
    id: number,
    type: string
}

const CreateLessonView = () => {

    const { t } = useTranslation();
    const current_date: Date = new Date();
    const date: string = current_date.getDate().toString().padStart(2, '0') + '.' + (current_date.getMonth() + 1).toString().padStart(2, '0') + '.' + current_date.getFullYear().toString();

    const [lessonName, setLessonName] = useState<string>('От ' + date);
    const [lessonDescription, setLessonDescription] = useState<string>('');
    const [lessonWords, setLessonWords] = useState<Word[]>([]);
    const [lessonBody, setLessonBody] = useState<(Exercise | Theory)[]>([]);

    const [displayedElements, setDisplayedElements] = useState<ReactElement<ElementProps>[]>([]);
    const [newElementId, setNewElementId] = useState<number>(0);

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
        setLessonBody(prevState => prevState.filter(item => item.id != newExercise.id));
        setLessonBody(prevState => [...prevState, newExercise]);
    }

    const addTheory = (newTheory: Theory) => {
        setLessonBody(prevState => prevState.filter(item => item.id != newTheory.id));
        setLessonBody(prevState => [...prevState, newTheory]);
    }

    const resetLessonWords = () => {
        setLessonWords([]);
    }

    const deleteLessonSection = (id: number) => {
        setLessonBody(prevState => prevState.filter(item => item.id != id));
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
        ['THEORY', <LessonTheory
            id={newElementId}
            key={newElementId}
            type='THEORY'
            addTheory={addTheory}
            deleteLessonTheory={deleteLessonSection}
            deleteElement={() => deleteElement(newElementId)}
        />],
        ['TRANSLATION_EXERCISE', <LessonTranslationExercise
            id={newElementId}
            key={newElementId}
            type='TRANSLATION_EXERCISE'
            addExercise={addExercise}
            deleteLessonExercise={deleteLessonSection}
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

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector<RootState, User>((state) => state.user.user);
    const { status } = useSelector((state: State) => state.lesson);
    const parameters = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role?.role_code != 'teacher') navigate('/my-courses');
    }, []);

    const saveLesson = () => {
        const lesson = {
            lesson_name: lessonName || 'От ' + date,
            lesson_description: lessonDescription || 'Этот урок обеспечит ощутимые результаты. Улучшите свою грамматику, словарный запас и навыки общения – всё за одно занятие!',
            lesson_words: JSON.parse(JSON.stringify(lessonWords)),
            lesson_body: JSON.parse(JSON.stringify(lessonBody))
        }

        dispatch(postLesson({ course: parameters.id!, lesson: lesson }))
            .then(() => navigate('/teacher/courses/' + parameters.id));
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
                <Title>Добавить в урок</Title>
                <Buttons>
                    <ActonButton onClick={() => addLessonSection('LESSON_WORDS')}
                        disabled={displayedElements.includes(displayedElements.find(item => item.props.type === 'LESSON_WORDS')!)}>
                        Слова к уроку
                    </ActonButton>
                    <ActonButton onClick={() => addLessonSection('THEORY')}>
                        Теорию
                    </ActonButton>
                    <ActonButton onClick={() => addLessonSection('TRANSLATION_EXERCISE')}>
                        Упражнение на перевод
                    </ActonButton>
                </Buttons>
            </Intro>
            <Intro>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <Title>Готово?</Title>
                    {
                        status == 'loading' ? <Button disabled><Loader /></Button> :
                            <Button onClick={saveLesson}>Сохранить урок</Button>
                    }
                    {
                        status === 'failed' && <Error>{t('error')}</Error>
                    }
                </Flex>
            </Intro>
            {/* <p>*перед публикацией урок проверяется модераторами, он будет доступен в ближайшее время</p> */}
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

const Buttons = styled(Flex)`
    flex-wrap: wrap;

    @media (max-width: 767px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Exercise, LessonInterface, Theory, TheoryBodyItem } from "../interfaces/lesson";
import { AppDispatch, RootState } from "../store";
import { useEffect, useMemo, useState } from "react";
import { completeLesson, fetchLesson } from "../features/lessonSlice";
import LessonIntro from "../components/LessonIntro";
import { State } from "../interfaces/requests";
import LessonLoader from "../components/LessonLoader";
import LessonWords from "../components/LessonWords";
import LessonTheoryStudentView from "../components/LessonTheoryStudentView";
import LessonTranslationExerciseStudentView from "../components/LessonTranslationExerciseStudentView";
import { Button, Message, Title } from "../styles/forms";
import { User } from "../interfaces/user";
import { fetchUser } from "../features/userSlice";

const Lesson = () => {

    const parameters = useParams();

    const user = useSelector<RootState, User>((state) => state.user.user);
    const lesson = useSelector<RootState, LessonInterface>((state) => state.lesson.lesson);
    const status = useSelector((state: State) => state.lesson.status);
    const dispatch = useDispatch<AppDispatch>();

    const isTheory = (item: TheoryBodyItem): item is Theory => item.type === 'THEORY';
    const isTranslationExercise = (item: TheoryBodyItem): item is Exercise => item.type === 'TRANSLATION_EXERCISE';

    const [time_start, setTime_start] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadLesson = async () => {
            try {
                await dispatch(fetchLesson(parameters.id!)).unwrap().then(() => dispatch(fetchUser()));
            } catch {
                navigate(-1);
            }
        };

        loadLesson();
    }, [dispatch, navigate, parameters.id]);

    const [done, setDone] = useState<Exercise[]>([]);

    const [savedExercises, setSavedExercises] = useState<Set<number>>(new Set());


    const _completeLesson = () => {

        const translationExercises = lessonBody[0].filter((item: TheoryBodyItem) =>
            isTranslationExercise(item)).map((ex: Exercise) => ex.id);

        const allSaved = translationExercises.every((id: number) =>
            savedExercises.has(id)
        );

        if (!allSaved) {
            return;
        }

        dispatch(completeLesson({
            lesson_id: lesson.id_lesson!,
            st_answer: JSON.parse(JSON.stringify((done))),
            time_start: time_start!,
            time_end: formatISODate(new Date())
        })).then(() => window.location.reload());
    }

    const formatISODate = (date: Date) => date.toISOString().replace('T', ' ').slice(0, 19);

    useEffect(() => setTime_start(formatISODate(new Date())), []);

    const lessonBody = lesson.lesson_body ? JSON.parse(lesson.lesson_body) : null;

    const translationExercisesCount = useMemo(() => {
        if (!lesson.lesson_body || !lessonBody) return 0;
        return lessonBody[0].filter((item: TheoryBodyItem) =>
            isTranslationExercise(item)
        ).length;
    }, [lesson.lesson_body, lessonBody]);

    return (
        <Main>
            {
                status === 'loading' && <LessonLoader />
            }
            {
                status === 'succeeded' &&
                <>
                    <LessonIntro lesson={lesson} />
                    {
                        lessonBody?.lesson_words && <LessonWords words={lessonBody?.lesson_words} />
                    }
                    {
                        lesson.lesson_body && lessonBody[0].map((item: TheoryBodyItem) => isTheory(item) ?
                            <LessonTheoryStudentView theory={item} key={item.id} />
                            :
                            isTranslationExercise(item) && <LessonTranslationExerciseStudentView
                                exercise={item} key={item.id} setDone={setDone} done={lesson.done!} savedExercises={savedExercises} setSavedExercises={setSavedExercises}
                            />)
                    }
                    {
                        !lesson.done && user.role?.role_code != 'teacher' &&
                        <Section>
                            <Flex style={{ justifyContent: 'space-between' }}>
                                <Title>Готово?</Title>
                                <Button onClick={_completeLesson} disabled={savedExercises.size !== translationExercisesCount}
                                >Завершить урок</Button>
                            </Flex>
                            {savedExercises.size !== translationExercisesCount && (
                                <Message style={{ alignSelf: 'center' }}>
                                    {translationExercisesCount === 0
                                        ? "Нет упражнений для сохранения"
                                        : `Сохраните все упражнения (${savedExercises.size}/${translationExercisesCount})`}
                                </Message>
                            )}
                        </Section>
                    }
                </>
            }
        </Main>
    )
}

export default Lesson;

const Flex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
`

const Section = styled.section`
    margin: -40px 80px 40px 80px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    background-color: rgb(245, 245, 245);
    border-radius: 32px;

    @media (max-width: 1024px) {
        margin: -40px 60px 40px 60px;
    }

    @media (max-width: 768px) {
        margin: -30px 40px 40px 40px;
    }

    @media (max-width: 426px) {
        & > div {
            flex-direction: column;
            align-items: flex-start;
        }
        margin: -10px 24px 30px 24px;
    }
`

const Main = styled.main`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
`
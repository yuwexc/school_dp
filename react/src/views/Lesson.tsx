import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Exercise, LessonInterface, Theory, TheoryBodyItem } from "../interfaces/lesson";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { completeLesson, fetchLesson } from "../features/lessonSlice";
import LessonIntro from "../components/LessonIntro";
import { State } from "../interfaces/requests";
import LessonLoader from "../components/LessonLoader";
import LessonWords from "../components/LessonWords";
import LessonTheoryStudentView from "../components/LessonTheoryStudentView";
import LessonTranslationExerciseStudentView from "../components/LessonTranslationExerciseStudentView";
import { Button, Title } from "../styles/forms";

const Lesson = () => {

    const parameters = useParams();

    const lesson = useSelector<RootState, LessonInterface>((state) => state.lesson.lesson);
    const status = useSelector((state: State) => state.lesson.status);
    const dispatch = useDispatch<AppDispatch>();

    const isTheory = (item: TheoryBodyItem): item is Theory => item.type === 'THEORY';
    const isTranslationExercise = (item: TheoryBodyItem): item is Exercise => item.type === 'TRANSLATION_EXERCISE';

    const [time_start, setTime_start] = useState<string>();

    useEffect(() => {
        dispatch(fetchLesson(parameters.id!));
    }, [dispatch, parameters.id]);

    const [done, setDone] = useState<Exercise[]>([]);

    const _completeLesson = () => {
        dispatch(completeLesson({
            lesson_id: lesson.id_lesson!,
            st_answer: JSON.parse(JSON.stringify((done))),
            time_start: time_start!,
            time_end: new Date().toISOString().split('T').join(' ').slice(0, 19)
        })).then(() => window.location.reload());
    }

    useEffect(() => setTime_start(new Date().toISOString().split('T').join(' ').slice(0, 19)), []);

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
                        JSON.parse(lesson.lesson_body!).lesson_words && <LessonWords words={JSON.parse(lesson.lesson_body!).lesson_words} />
                    }
                    {
                        lesson.lesson_body && JSON.parse(lesson.lesson_body)[0].map((item: TheoryBodyItem) => isTheory(item) ?
                            <LessonTheoryStudentView theory={item} key={item.id} />
                            :
                            isTranslationExercise(item) && <LessonTranslationExerciseStudentView
                                exercise={item} key={item.id} setDone={setDone} done={lesson.done!}
                            />)
                    }
                    {
                        !lesson.done &&
                        <Section>
                            <Flex style={{ justifyContent: 'space-between' }}>
                                <Title>Готово?</Title>
                                <Button onClick={_completeLesson}>Завершить урок</Button>
                            </Flex>
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
`

const Main = styled.main`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
`
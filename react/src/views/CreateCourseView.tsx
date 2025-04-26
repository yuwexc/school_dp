import styled from "styled-components";
import { Button, Error, Input, Select, Title } from "../styles/forms";
import { useEffect, useState } from "react";
import { Level } from "../interfaces/level";
import { Category } from "../interfaces/category";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../interfaces/requests";
import { AppDispatch } from "../store";
import { postCourse } from "../features/courseSlice";
import { useNavigate } from "react-router-dom";

const CreateCourseView = () => {

    const { t } = useTranslation();
    const [levels, setLevels] = useState<Level[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);

    const status = useSelector((state: State) => state.courses.status);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onLoad = () => {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://dp-chernaev.xn--80ahdri7a.site/api/levels", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLevels(result);
                setCourseLevel(result[0].id_level);
            })
            .catch(() => { });

        fetch("https://dp-chernaev.xn--80ahdri7a.site/api/categories", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCategories(result);
                setCourseCategory(result[0].id_category)
            })
            .catch(() => { });
    }

    useEffect(onLoad, []);

    const current_date: Date = new Date();
    const date: string = current_date.getDate().toString().padStart(2, '0') + '.' + (current_date.getMonth() + 1).toString().padStart(2, '0') + '.' + current_date.getFullYear().toString();

    const [courseName, setCourseName] = useState<string>('От ' + date);
    const [courseDescription, setСourseDescription] = useState<string>('');
    const [courseLevel, setCourseLevel] = useState<number>();
    const [courseCategory, setCourseCategory] = useState<number>();

    const createCourse = () => {
        dispatch(postCourse({
            course_name: courseName || 'От ' + date,
            course_description: courseDescription || 'Этот курс обеспечит ощутимые результаты. Улучшите свою грамматику, словарный запас и навыки общения!',
            level_id: courseLevel!,
            category_id: courseCategory!
        })).finally(() => navigate('/my-courses'));
    }

    return (
        <StyledMain>
            <Intro>
                <Title>Название курса</Title>
                <p>Название должно быть коротким, информативным и привлекательным. Отразите основную тему курса.</p>
                <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} id="course_name"></Input>
            </Intro>
            <Intro>
                <Title>Описание курса</Title>
                <p>Сформулируйте краткое описание того, чему научится ученик на курсе. Укажите ключевые навыки или знания, которые он приобретет. Избегайте подробного описания процесса обучения – сконцентрируйтесь на результате.</p>
                <Input as="textarea"
                    value={courseDescription}
                    onChange={(e) => setСourseDescription(e.target.value)}
                    id="course_description"
                    rows={4}
                    style={{ outline: 0, resize: 'vertical' }}
                ></Input>
            </Intro>
            <Intro>
                <Title>Уровень курса</Title>
                <Select value={courseLevel} onChange={(e) => setCourseLevel(Number(e.target.value))} id="level">
                    {
                        levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                    }
                </Select>
            </Intro>
            <Intro>
                <Title>Категория курса</Title>
                <Select value={courseCategory} onChange={(e) => setCourseCategory(Number(e.target.value))} id="category">
                    {
                        categories && categories.map((category) => <option value={category.id_category} key={category.id_category}>{category.category_name}</option>)
                    }
                </Select>
            </Intro>
            <Intro>
                <Flex style={{ justifyContent: 'space-between' }}>
                    <Title>Готово?</Title>
                    {
                        status == 'loading' ? <Button disabled><Loader /></Button> :
                            <Button onClick={createCourse}>Создать курс</Button>
                    }
                    {
                        status === 'failed' && <Error>{t('error')}</Error>
                    }
                </Flex>
            </Intro>
        </StyledMain>
    )
}

export default CreateCourseView;

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
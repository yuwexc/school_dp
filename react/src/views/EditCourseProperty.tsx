import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, RootState } from "../store";
import { CourseItemInterface } from "../interfaces/course";
import { State } from "../interfaces/requests";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Error, Input, Message, Select } from "../styles/forms";
import Loader from "../components/Loader";
import { fetchMyCoursesItem, updateCourse } from "../features/courseSlice";
import { User } from "../interfaces/user";
import { Level } from "../interfaces/level";
import { Category } from "../interfaces/category";
import { useTranslation } from "react-i18next";

export interface FieldValues {
    id?: string,
    course_name?: string,
    course_description?: string,
    level_id?: number,
    category_id?: number,
    image: File | string | null
}

const EditCourseProperty = () => {

    const { t } = useTranslation();
    const { id, property } = useParams<{ id: string, property: "course_name" | "course_description" | "level_id" | "category_id" | "image" }>();

    const user = useSelector<RootState, User>((state) => state.user.user);
    const course = useSelector<RootState, CourseItemInterface | null>((state) => state.courses.course);
    const status = useSelector((state: State) => state.courses.status);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch(fetchMyCoursesItem(id!));

    }, [dispatch, id]);

    useEffect(() => {

        if (course && course.author.id_user != user.id_user) {
            navigate('/courses/' + course!.id_course);
        }

    }, [course, navigate, user.id_user]);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        dispatch(updateCourse({
            id: id!,
            course_name: data.course_name,
            course_description: data.course_description,
            level_id: Number(data.level_id) || course!.level.id_level,
            category_id: Number(data.category_id) || course!.category?.id_category,
            image: data.image || course!.image
        })).then(() => navigate('/teacher/courses/' + course?.id_course));
    }

    const [levels, setLevels] = useState<Level[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [errorLevel, setErrorLevel] = useState<boolean>(true);
    const [errorCategory, setErrorCategory] = useState<boolean>(true);

    const onLoad = () => {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        if (property === 'level_id') {
            fetch("https://dp-chernaev.xn--80ahdri7a.site/api/levels", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setErrorLevel(true);
                    setLevels(result);
                })
                .catch(() => {
                    setErrorLevel(false);
                });
        }

        if (property === 'category_id') {
            fetch("https://dp-chernaev.xn--80ahdri7a.site/api/categories", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setErrorCategory(true);
                    setCategories(result);
                })
                .catch(() => {
                    setErrorCategory(false)
                });
        }
    }

    useEffect(onLoad, [property]);

    return (
        <StyledMain>
            {
                course &&
                <Intro>
                    <Title>Редактирование курса: "{course.course_name.charAt(0).toUpperCase() + course.course_name.slice(1)}"</Title>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor={property}>{t('update.course.' + property)}</label>
                        {
                            (property === 'level_id' || property === 'category_id') &&
                            <>
                                {
                                    property === 'level_id' && errorLevel &&
                                    <Select {...register(property, {
                                        required: {
                                            value: true, message: t('sign_up.empty')
                                        }
                                    })} id={property}>
                                        <option value={''}></option>
                                        {
                                            levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                                        }
                                    </Select>
                                }
                                {
                                    property === 'category_id' && errorCategory &&
                                    <Select {...register(property, {
                                        required: {
                                            value: true, message: t('sign_up.empty')
                                        }
                                    })} id={property}>
                                        <option value={''}></option>
                                        {
                                            categories && categories.map((category) => <option value={category.id_category} key={category.id_category}>{category.category_name}</option>)
                                        }
                                    </Select>
                                }
                                {
                                    errors[property!]?.message && <Message>{errors[property!]?.message}</Message>
                                }
                            </>
                        }
                        {
                            (property != 'level_id' && property != 'category_id' && property != 'image') &&
                            <>
                                <Input {...register(property!, {
                                    required: {
                                        value: true, message: t('sign_up.empty')
                                    }
                                })} type="text" id={property} />
                                {
                                    errors[property!]?.message && <Message>{errors[property!]?.message}</Message>
                                }

                            </>
                        }
                        {
                            (property === 'image') &&
                            <>
                                <Input {...register(property!, {
                                    required: {
                                        value: true, message: t('sign_up.empty')
                                    }
                                })} type="file" id={property} />
                                {
                                    errors[property!]?.message && <Message>{errors[property!]?.message}</Message>
                                }

                            </>
                        }
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {
                                status == 'loading' ? <Button disabled><Loader /></Button> :
                                    <Button type="submit">{t('settings.update')}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48911 6.2367C3.65493 4.81893 4.85617 3.75 6.28361 3.75H17.0263C17.2084 3.75 17.3843 3.81626 17.5211 3.93641L20.2816 6.3602C20.9022 6.90511 21.245 7.70008 21.2154 8.52543L20.8714 18.0988C20.8182 19.5781 19.6035 20.75 18.1232 20.75H6.11291C4.78329 20.75 3.66076 19.762 3.49191 18.4432C2.99542 14.565 2.97403 10.6407 3.42822 6.75728L3.48911 6.2367ZM6.28361 5.25C5.61719 5.25 5.05637 5.74905 4.97895 6.41096L4.91807 6.93153C4.47805 10.6937 4.49877 14.4955 4.97977 18.2527C5.05277 18.8229 5.53807 19.25 6.11291 19.25H6.75V15C6.75 14.0335 7.5335 13.25 8.5 13.25H15.5C16.4665 13.25 17.25 14.0335 17.25 15V19.25H18.1232C18.7961 19.25 19.3482 18.7173 19.3724 18.0449L19.7164 8.47157C19.7298 8.09641 19.574 7.73505 19.2919 7.48737L16.75 5.2555V7.59998C16.75 8.56647 15.9665 9.34998 15 9.34998H9C8.0335 9.34998 7.25 8.56647 7.25 7.59998V5.25H6.28361ZM8.75 5.25V7.59998C8.75 7.73805 8.86193 7.84998 9 7.84998H15C15.1381 7.84998 15.25 7.73805 15.25 7.59998V5.25H8.75ZM15.75 19.25H8.25V15C8.25 14.8619 8.36193 14.75 8.5 14.75H15.5C15.6381 14.75 15.75 14.8619 15.75 15V19.25Z" fill="white" />
                                        </svg>
                                    </Button>
                            }
                            {
                                status === 'failed' && <Error>{t('error')}</Error>
                            }
                        </div>
                    </StyledForm>
                    <Link to={'/teacher/courses/' + course.id_course} style={{ color: '#6c5ce7', fontWeight: '600' }}>Назад</Link>
                </Intro>
            }
        </StyledMain>
    )
}

export default EditCourseProperty;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Title = styled.h2`
    width: 100%;
    font-weight: 600;
    font-size: 32px;
    word-break: break-word;

    @media (max-width: 1279px) {
        font-size: 32px;
    }

    @media (max-width: 767px) {
        min-width: 100%;
    }

    @media (max-width: 576px) {
        font-size: 24px;
    }
`

const Intro = styled.section`
    width: 100%;
    max-width: 1304px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 32px;
    gap: 20px;
    border-radius: 18px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
        padding: 32px 32px 48px;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 12px;
        padding: 24px;
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
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
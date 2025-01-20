import styled from "styled-components";
import { Button, Error, Input, Message, Title } from "../styles/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangugageButton from "../components/LanguageButton";
import BackButton from "../components/BackButton";
import { setLanguage } from "../../public/locales/Language";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { State } from "../interfaces/requests";
import { loginUser } from "../features/userSlice";
import Loader from "../components/Loader";

interface FormData {
    email: string,
    password: string
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector<RootState, string | null>((state) => state.user.token);
    const { status, error } = useSelector((state: State) => state.user);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await dispatch(loginUser(data));
    }

    useEffect(() => {
        if (token != undefined && token != null && token != '') {
            localStorage.setItem('ACCESS_TOKEN', token!);
            navigate('/profile');
        }
    }, [navigate, token]);

    return (
        <StyledSection>
            <div>
                <FormBlock>
                    <Head>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <BackButton onClick={() => move()} />
                            <Title translate="no">LIMN.</Title>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <LangugageButton lang="en" onClick={() => changeLanguage("en")}>EN</LangugageButton>
                            <LangugageButton lang="ru" onClick={() => changeLanguage("ru")}>RU</LangugageButton>
                        </div>
                    </Head>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h2>{t('login.title')}</h2>
                        <p>{t('login.text')}</p>
                        <div>
                            <label htmlFor="email">{t('login.email')}</label>
                            <Input {...register('email', {
                                required: { value: true, message: t('login.empty') },
                                pattern: {
                                    value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: t('login.incorrect')
                                }
                            })} placeholder="example@gmail.com" autoComplete="email" id="email" />
                            {
                                errors && <Message>{errors.email?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">{t('login.password')}</label>
                            <Input {...register('password', { required: { value: true, message: t('login.empty') } })} type="password" placeholder={t('login.password_placeholder')} id="password" />
                            {
                                errors && <Message>{errors.password?.message}</Message>
                            }
                            {
                                status === 'failed' && <Error>{t('error')}</Error>
                            }
                            {
                                error && <Error>{t('login.failed_login')}</Error>
                            }
                        </div>
                        {
                            status === 'loading' ? <Button disabled><Loader /></Button>
                                :
                                <Button type="submit">{t('login.log_in')}</Button>
                        }
                        <p>{t('login.not_account')} <Link style={{ color: '#2d55ff' }} to={'/sign-up'}>{t('login.sign_up')}</Link></p>
                    </Form>
                </FormBlock>
                <Image translate="no" />
            </div>
        </StyledSection>
    )
}

export default Login;

export const Form = styled.form`
    margin-top: 25%;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 768px;
    text-align: center;
    padding-inline: 30px;

    h2 {
        font-size: 65px;
        line-height: 60px;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;

        label {
            align-self: flex-start;
        }

        input {
            width: calc(100% - 20px);
        }
    }

    @media (width <=1100px) {
        margin-top: unset;
    }

    @media (width <= 576px) {
        width: 100%;
        padding: 0;

        h2 {
            font-size: 45px;
            line-height: 54px;
        }
    }
`

export const Head = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const FormBlock = styled.div`
    position: relative;
    padding: 30px;
    height: 100%;
    min-width: 452px;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    @media (width <= 1100px) {
        & {
            max-width: unset;
            width: calc(100% - 60px) !important;
            height: 100%;
            justify-content: center;
        }
    }

    @media (width <= 576px) {
        min-width: unset !important;
        padding: 10px;
        width: calc(100% - 20px) !important;
    }
`

export const Image = styled.div`
    position: relative;
    min-width: 512px;
    max-width: 512px;
    background-image: url(/images/table.jpeg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    @media (width <= 1100px) {
        & {
            display: none;
        }
    }
`

export const StyledSection = styled.section`
    background-color: #ebebeb;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 95%;
        max-width: 1024px;
        height: 85%;
        background-color: white;
        border-radius: 30px;
        box-shadow: 0 0 30px 0 lightgray;
        overflow: hidden;

        @media (width <= 1100px) {
            height: calc(100% - 20px);
            flex-wrap: nowrap;
            flex-direction: column-reverse;
            justify-content: flex-end;
            align-items: center;
        }
    }
`
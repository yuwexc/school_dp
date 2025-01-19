import styled from "styled-components";
import { Button, Error, Input, Message, Title } from "../styles/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangugageButton from "../components/LanguageButton";
import BackButton from "../components/BackButton";
import { setLanguage } from "../../public/locales/Language";
import { useState } from "react";

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

    const [error, setError] = useState<string>('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": data.email,
            "password": data.password
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("https://dp-chernaev.xn--80ahdri7a.site/api/login", requestOptions)
            .then(async (response) => await response.json())
            .then((result) => {
                if (result.token) {
                    setError('');
                    localStorage.setItem('ACCESS_TOKEN', result.token);
                    navigate('/profile');
                } else {
                    setError(t('login.failed_login'));
                }
            })
            .catch(() => {
                setError(t('error'));
            });
    }

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

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
                        </div>
                        <Button type="submit">{t('login.log_in')}</Button>
                        {error && <Error>{error}</Error>}
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
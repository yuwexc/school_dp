import styled from "styled-components";
import { Button, Input, Message, Title } from "../styles/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangugageButton from "../components/LanguageButton";

interface FormData {
    email: string,
    password: string
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    }

    return (
        <StyledSection>
            <div>
                <FormBlock>
                    <Head>
                        <Title translate="no">LIMN.</Title>
                        <div style={{display: 'flex', gap: '5px'}}>
                            <LangugageButton lang="en" onClick={() => changeLanguage("en")}>EN</LangugageButton>
                            <LangugageButton lang="ru" onClick={() => changeLanguage("ru")}>RU</LangugageButton>
                        </div>
                    </Head>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <h2>{t('login.title')}</h2>
                        <p>{t('login.text')}</p>
                        <div>
                            <label htmlFor="email">{t('login.email')}</label>
                            <Input {...register('email', { required: { value: true, message: 'The field must be filled in' } })} type="email" placeholder="example@gmail.com" autoComplete="email" id="email" />
                            {
                                errors && <Message>{errors.email?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">{t('login.password')}</label>
                            <Input {...register('password', { required: { value: true, message: 'The field must be filled in' } })} type="password" placeholder={t('login.password_placeholder')} id="password" />
                            {
                                errors && <Message>{errors.password?.message}</Message>
                            }
                        </div>
                        <Button>{t('login.log_in')}</Button>
                        <p>{t('login.not_account')} <Link style={{ color: '#2d55ff' }} to={'/sign-up'}>{t('login.sign_up')}</Link></p>
                    </Form>
                </FormBlock>
                <Image translate="no" />
            </div>
        </StyledSection>
    )
}

export default Login;

const Form = styled.form`
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
        font-size: 76px;
        line-height: 70px;
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
            font-size: 60px;
            line-height: 54px;
        }
    }
`

const Head = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const FormBlock = styled.div`
    position: relative;
    padding: 30px;
    min-width: 452px;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 0;
    }

    @media (width <= 1100px) {
        & {
            max-width: unset;
            width: calc(100% - 60px);
            height: 100%;
            justify-content: center;
        }
    }

    @media (width <= 576px) {
        min-width: unset;
        padding: 10px;
        width: calc(100% - 20px);
    }
`

const Image = styled.div`
    min-width: 512px;
    max-width: 512px;
    background-image: url(/public/images/table.jpeg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    @media (width <= 1100px) {
        & {
            display: none;
        }
    }
`

const StyledSection = styled.section`
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
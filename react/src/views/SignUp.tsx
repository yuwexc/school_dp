import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import LangugageButton from "../components/LanguageButton";
import { Annotation, Button, Input, Message, Select, Span, Title } from "../styles/forms";
import { Form, FormBlock, Head, Image, StyledSection } from "./Login";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../public/locales/Language";
import { SubmitHandler, useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import SwiperButtonNext from "../components/SwiperButtonNext";
import "swiper/swiper-bundle.css";
import { EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import SwiperButtonPrev from "../components/SwiperButtonPrev";

interface FormData {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    phone: string,
    level: number
}

interface Level {
    id_level: number
    level_code: string
    level_name: string
    level_title: string
    created_at: string
    updated_at: string | null
}

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [levels, setLevels] = useState<Level[] | null>(null);

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    }

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

    const onLoad = () => {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://dp-chernaev.xn--80ahdri7a.site/api/levels", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setLevels(result);
            })
            .catch((error) => console.error(error));
    }

    useEffect(onLoad, []);

    return (
        <StyledSwiper modules={[EffectFade]} effect="cube" allowTouchMove={false} >
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledSection>
                    <div>
                        <SignUpFormBlock>
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
                            <SignUpForm>
                                <h2>{t('sign_up.title')}</h2>
                                <p>{t('sign_up.text')}</p>
                                <SwiperButtonNext>{t('sign_up.next')}</SwiperButtonNext>
                                <p>{t('sign_up.acc_exist')} <Link style={{ color: '#2d55ff' }} to={'/login'}>{t('sign_up.log_in')}</Link></p>
                            </SignUpForm>
                        </SignUpFormBlock>
                        <Image style={{ backgroundImage: 'url(/public/images/man.jpeg)' }} translate="no" />
                    </div>
                </StyledSection>
            </SwiperSlide>
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledSection>
                    <div>
                        <FullFormBlock>
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
                            <FullForm onSubmit={handleSubmit(onSubmit)}>
                                <h3>{t('sign_up.personal')}</h3>
                                <div>
                                    <div>
                                        <label htmlFor="first_name">{t('sign_up.first_name')}</label>
                                        <Input {...register('first_name', { required: { value: true, message: t('sign_up.empty') } })} type="text" placeholder={t('sign_up.first_name_placeholder')} autoComplete="given-name" id="first_name" />
                                        {
                                            errors && <Message>{errors.first_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="last_name">{t('sign_up.last_name')}</label>
                                        <Input {...register('last_name', { required: { value: true, message: t('sign_up.empty') } })} type="text" placeholder={t('sign_up.last_name_placeholder')} autoComplete="family-name" id="last_name" />
                                        {
                                            errors && <Message>{errors.last_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name">{t('sign_up.middle_name')}</label>
                                        <Input {...register('middle_name')} type="text" placeholder={t('sign_up.middle_name_placeholder')} autoComplete="additional-name" id="middle_name" />
                                        {
                                            errors && <Message>{errors.middle_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="phone">{t('sign_up.phone')}</label>
                                        <Input {...register('phone', {
                                            required: { value: true, message: t('sign_up.empty') },
                                            pattern: {
                                                value: /((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{11}$/,
                                                message: t('sign-up.incorrect')
                                            }
                                        })} type="tel" placeholder={t('sign_up.phone_placeholder')} autoComplete="tel-national" id="phone" />
                                        {
                                            errors && <Message>{errors.phone?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="email">{t('sign_up.email')}</label>
                                        <Input {...register('email', {
                                            required: { value: true, message: t('sign_up.empty') },
                                            pattern: {
                                                value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: t('login.incorrect')
                                            }
                                        })} placeholder="example@gmail.com" autoComplete="email" id="email"
                                        />
                                        {
                                            errors && <Message>{errors.email?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="password" style={{ display: 'flex', alignItems: 'center' }}>
                                            {t('sign_up.password')}
                                            <Span>
                                                ?
                                                <Annotation>{t('sign_up.pattern')}</Annotation>
                                            </Span>
                                        </label>
                                        <Input {...register('password', {
                                            required: { value: true, message: t('sign_up.empty') },
                                            pattern: {
                                                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                                                message: t('sign_up.incorrect')
                                            }
                                        })} type="password" placeholder={t('sign_up.password_placeholder')} id="password"
                                        />
                                        {
                                            errors && <Message>{errors.password?.message}</Message>
                                        }
                                    </div>
                                </div>
                                <h3>{t('sign_up.additional')}</h3>
                                <div>
                                    <div>
                                        <label htmlFor="level">{t('sign_up.level')}</label>
                                        <Select {...register('level', { required: { value: true, message: t('sign_up.nolevel') } })} id="level">
                                            <option value={''}></option>
                                            {
                                                levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                                            }
                                        </Select>
                                        {
                                            errors && <Message>{errors.level?.message}</Message>
                                        }
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <Button>{t('sign_up.sign_up')}</Button>
                                    <SwiperButtonPrev>{t('sign_up.back')}</SwiperButtonPrev>
                                </div>
                            </FullForm>
                        </FullFormBlock>
                    </div>
                </StyledSection>
            </SwiperSlide>
        </StyledSwiper>

    )
}

export default SignUp;

const SignUpForm = styled(Form)`
    margin-top: unset;
`

const SignUpFormBlock = styled(FormBlock)`
    justify-content: center;
`

const FullForm = styled.form`
    margin-top: 70px;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    padding-inline: 30px;

    h2 {
        font-size: 65px;
        line-height: 60px;
    }

    h3 {
        align-self: flex-start;
    }

    div {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 10px;

        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;

            label {
                align-self: flex-start;
            }
        }
    }

    @media (width <=1100px) {
        margin-top: unset;
    }

    @media (width <=936px) {
        margin-top: 70px;
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

const FullFormBlock = styled(FormBlock)`
    position: relative;
    padding: 30px;
    height: 100%;
    width: 100%;
    min-width: 452px;
    max-width: 1024px;
    align-items: stretch;
`

const StyledSwiper = styled(Swiper)`
    background-color: #ebebeb;
    width: 100%;
`
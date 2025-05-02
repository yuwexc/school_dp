import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import LangugageButton from "../components/LanguageButton";
import { Annotation, Button, Error, Input, Message, Select, Span, Title } from "../styles/forms";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { postUser } from "../features/userSlice";
import { State } from "../interfaces/requests";
import Loader from "../components/Loader";
import { User } from "../interfaces/user";
import { Level } from "../interfaces/level";

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const [levels, setLevels] = useState<Level[] | null>(null);

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    const navigate = useNavigate();

    const move = () => {
        navigate('/');
    }

    const [errorLevel, setErrorLevel] = useState<boolean>(true);

    const onLoad = () => {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

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

    useEffect(onLoad, []);

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector<RootState, string | null>((state) => state.user.token);
    const { status, error } = useSelector((state: State) => state.user);


    const onSubmit: SubmitHandler<User> = async (data) => {
        if (data.phone![0] === '8') {
            data.phone = '+7' + data.phone!.split('').splice(1).join('');
        }
        /*const key = CryptoJS.lib.WordArray.random(16);
        data.password = CryptoJS.AES.encrypt(data.password!, key, { iv: key }).toString();*/
        await dispatch(postUser(data));
    }

    useEffect(() => {
        if (token != undefined && token != null && token != '') {
            localStorage.setItem('ACCESS_TOKEN', token!);
            navigate('/dashboard');
        }
    }, [navigate, token]);

    const [existencePhone, setExistencePhone] = useState<boolean>(false);

    const phone = async (phone: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "phone": phone
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("https://dp-chernaev.xn--80ahdri7a.site/api/users/phone/exist", requestOptions)
            .then(async (response) => await response.json())
            .then((result) => {
                setExistencePhone(result.phone);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const [existenceEmail, setExistenceEmail] = useState<boolean>(false);

    const email = async (email: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("https://dp-chernaev.xn--80ahdri7a.site/api/users/email/exist", requestOptions)
            .then(async (response) => await response.json())
            .then((result) => {
                setExistenceEmail(result.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                                <p>{t('sign_up.acc_exist')} <Link style={{ color: '#6c5ce7' }} to={'/login'}>{t('sign_up.log_in')}</Link></p>
                            </SignUpForm>
                        </SignUpFormBlock>
                        <Image style={{ backgroundImage: 'url(/images/man.jpeg)' }} translate="no" />
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
                                        <Input {...register('first_name', {
                                            required: {
                                                value: true, message: t('sign_up.empty')
                                            },
                                            pattern: {
                                                value: /^[a-zA-Zа-яА-ЯёЁ-]+$/i,
                                                message: t('sign_up.incorrect')
                                            }
                                        })} type="text" placeholder={t('sign_up.first_name_placeholder')} autoComplete="name" id="first_name" />
                                        {
                                            errors && <Message>{errors.first_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="last_name">{t('sign_up.last_name')}</label>
                                        <Input {...register('last_name', {
                                            required: {
                                                value: true, message: t('sign_up.empty')
                                            },
                                            pattern: {
                                                value: /^[a-zA-Zа-яА-ЯёЁ-]+$/i,
                                                message: t('sign_up.incorrect')
                                            }
                                        })} type="text" placeholder={t('sign_up.last_name_placeholder')} autoComplete="family-name" id="last_name" />
                                        {
                                            errors && <Message>{errors.last_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name">{t('sign_up.middle_name')}</label>
                                        <Input {...register('middle_name', {
                                            pattern: {
                                                value: /^[a-zA-Zа-яА-ЯёЁ-]+$/i,
                                                message: t('sign_up.incorrect')
                                            }
                                        })} type="text" placeholder={t('sign_up.middle_name_placeholder')} autoComplete="additional-name" id="middle_name" />
                                        {
                                            errors && <Message>{errors.middle_name?.message}</Message>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="phone">{t('sign_up.phone')}</label>
                                        <Input {...register('phone', {
                                            required: { value: true, message: t('sign_up.empty') },
                                            pattern: {
                                                value: /^(?:\+7|8)\d{10}$/,
                                                message: t('sign_up.incorrect')
                                            }
                                        })} type="tel" placeholder={t('sign_up.phone_placeholder')} autoComplete="tel-national" id="phone"
                                            onBlur={(e) => phone(e.target.value)} />
                                        {
                                            existencePhone && <Message>{t('sign_up.phone_existence')}</Message>
                                        }
                                        {
                                            errors && <Message>{errors.phone?.message}</Message>
                                        }

                                    </div>
                                    <div>
                                        <label htmlFor="email">{t('sign_up.email')}</label>
                                        <Input {...register('email', {
                                            required: { value: true, message: t('sign_up.empty') },
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                                message: t('login.incorrect')
                                            }
                                        })} placeholder="example@gmail.com" autoComplete="email" id="email"
                                            onBlur={(e) => email(e.target.value)} />
                                        {
                                            existenceEmail && <Message>{t('sign_up.email_existence')}</Message>
                                        }
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
                                {
                                    errorLevel && <h3>{t('sign_up.additional')}</h3>
                                }
                                {
                                    errorLevel &&
                                    <div>
                                        <div>
                                            <label htmlFor="level">{t('sign_up.level')}</label>
                                            <Select {...register('level.id_level')} id="level">
                                                <option value={''}></option>
                                                {
                                                    levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                                                }
                                            </Select>
                                            {
                                                errors && <Message>{errors.level?.id_level?.message}</Message>
                                            }
                                        </div>
                                    </div>
                                }
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {
                                        status === 'loading' ? <Button disabled><Loader /></Button> :
                                            (existenceEmail === false && existencePhone === false ?
                                                <Button type="submit">{t('sign_up.sign_up')}</Button>
                                                :
                                                <Button disabled type="submit">{t('sign_up.sign_up')}</Button>)
                                    }
                                    {
                                        status === 'failed' && <Error>{t('error') + error}</Error>
                                    }
                                    {
                                        status != 'loading' && status != 'failed' && <SwiperButtonPrev>{t('sign_up.back')}</SwiperButtonPrev>
                                    }
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

    & > div {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 10px;

        & > div {
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
import styled from "styled-components";
import { Button, Error, Input, Message, Select } from "../styles/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../interfaces/user";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Level } from "../interfaces/level";
import Loader from "../components/Loader";
import { State } from "../interfaces/requests";
import { updateUser } from "../features/userSlice";
import LangugageButton from "../components/LanguageButton";
import { setLanguage } from "../../public/locales/Language";
import i18next, { t } from "i18next";
import { Language } from '../components/Header'

const Settings = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const user = useSelector<RootState, User>((state) => state.user.user);
    const { status, error } = useSelector((state: State) => state.user);

    const [existencePhone, setExistencePhone] = useState<boolean>(false);

    const phone = async (phone: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));

        const raw = JSON.stringify({
            "phone": phone
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("https://dp-chernaev.xn--80ahdri7a.site/api/users/phone/exist-on-update", requestOptions)
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
        myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));

        const raw = JSON.stringify({
            "email": email
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("https://dp-chernaev.xn--80ahdri7a.site/api/users/email/exist-on-update", requestOptions)
            .then(async (response) => await response.json())
            .then((result) => {
                setExistenceEmail(result.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const [levels, setLevels] = useState<Level[] | null>(null);
    const [errorLevel, setErrorLevel] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();

    const onLoad = () => {
        if (user.level?.id_level != null) return;

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

    const onSubmit: SubmitHandler<User> = async (data) => {
        if (data.phone![0] === '8') {
            data.phone = '+7' + data.phone!.split('').splice(1).join('');
        }
        
        dispatch(updateUser(data));
    }

    const changeLanguage = (language: string) => {
        i18next.changeLanguage(language);
        setLanguage(language);
    };

    return (
        <StyledMain>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <h3>{t('sign_up.personal')}</h3>
                <InfoBlock>
                    <div>
                        <label htmlFor="first_name">{t('sign_up.first_name')}</label>
                        <Input defaultValue={user.first_name!} {...register('first_name', {
                            required: { value: true, message: t('sign_up.empty') },
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ]$/,
                                message: t('sign_up.incorrect')
                            }
                        })} type="text" placeholder={t('sign_up.first_name_placeholder')} autoComplete="name" id="first_name" />
                        {
                            errors && <Message>{errors.first_name?.message}</Message>
                        }
                    </div>
                    <div>
                        <label htmlFor="last_name">{t('sign_up.last_name')}</label>
                        <Input defaultValue={user.last_name! || ''} {...register('last_name', {
                            required: { value: true, message: t('sign_up.empty') },
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ]$/,
                                message: t('sign_up.incorrect')
                            }
                        })} type="text" placeholder={t('sign_up.last_name_placeholder')} autoComplete="family-name"
                            id="last_name" />
                        {
                            errors && <Message>{errors.last_name?.message}</Message>
                        }
                    </div>
                    <div>
                        <label htmlFor="middle_name">{t('sign_up.middle_name')}</label>
                        <Input defaultValue={user.middle_name! || ''} {...register('middle_name', {
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ]$/,
                                message: t('sign_up.incorrect')
                            }
                        })}
                            type="text" placeholder={t('sign_up.middle_name_placeholder')} autoComplete="additional-name"
                            id="middle_name" />
                        {
                            errors && <Message>{errors.middle_name?.message}</Message>
                        }
                    </div>
                    <div>
                        <label htmlFor="phone">{t('sign_up.phone')}</label>
                        <Input defaultValue={user.phone! || ''} {...register('phone', {
                            required: { value: true, message: t('sign_up.empty') },
                            pattern: {
                                value: /((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{11}$/,
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
                        <Input defaultValue={user.email! || ''} contentEditable={true}  {...register('email', {
                            required: { value: true, message: t('sign_up.empty') },
                            pattern: {
                                value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                </InfoBlock>
                {
                    user.role?.role_code === 'student' && user.level?.id_level == null && errorLevel && <h3>{t('sign_up.additional')}</h3>
                }
                {
                    user.role?.role_code === 'student' && user.level?.id_level == null && errorLevel &&
                    <Levels>
                        <div>
                            <label htmlFor="level">{t('sign_up.level')}</label>
                            <Select defaultValue={user.level?.id_level} {...register('level.id_level')} id="level">
                                <option value={''}></option>
                                {
                                    levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                                }
                            </Select>
                            {
                                errors && <Message>{errors.level?.id_level!.message}</Message>
                            }
                        </div>
                    </Levels>
                }
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {
                        status === 'loading' ? <Button disabled><Loader /></Button> :
                            (existenceEmail === false && existencePhone === false ?
                                <Button type="submit">{t('settings.update')}</Button>
                                :
                                <Button disabled type="submit">{t('settings.update')}</Button>)
                    }
                    {
                        status === 'failed' && <Error>{t('error') + error}</Error>
                    }
                </div>
                <h3>{t('settings.language')}</h3>
                <Language>
                    <LangugageButton lang="en" onClick={() => changeLanguage("en")}>EN</LangugageButton>
                    <LangugageButton lang="ru" onClick={() => changeLanguage("ru")}>RU</LangugageButton>
                </Language>
            </StyledForm>
        </StyledMain>
    )
}

export default Settings;

const Levels = styled.div`
    width: 100%;

    & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }
`

const InfoBlock = styled.section`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 10px;

    @media (max-width: 426px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

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
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (577px <= width <= 768px) {
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        gap: 20px;
    }

    @media (425px >= width) {
        gap: 12px;
    }
`

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    background-color: white;

    @media (577px <= width <= 768px) {
        padding: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
    }
`
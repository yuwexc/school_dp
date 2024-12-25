import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, Input, Message, Title } from "../styles/forms";

interface FormData {
    first_name: string,
    last_name: string,
    middle_name: string,
    phone: string,
    email: string,
    password: string
}

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    }

    return (
        <StyledSection>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Регистрация</Title>
                <div>
                    <h3>Персональная информация</h3>
                    <div>
                        <div>
                            <label htmlFor="first_name">Имя</label>
                            <Input type="text" id="first_name" autoComplete="given-name" {...register('first_name', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.first_name?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="last_name">Фамилия</label>
                            <Input type="text" id="last_name" autoComplete="family-name" {...register('last_name', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.last_name?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="middle_name">Отчество</label>
                            <Input type="text" id="middle_name" autoComplete="additional-name" {...register('middle_name', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.middle_name?.message}</Message>
                            }
                        </div>
                    </div>
                    <h3>Контактная информация</h3>
                    <div>
                        <div>
                            <label htmlFor="email">Эл.почта</label>
                            <Input type="email" id="email" autoComplete="tel-national" {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.email?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="phone">Телефон</label>
                            <Input type="tel" id="phone" autoComplete="tel-national" {...register('phone', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.phone?.message}</Message>
                            }
                        </div>
                    </div>
                    <h3>Пароль</h3>
                    <div>
                        <div>
                            <label htmlFor="password">Пароль</label>
                            <Input type="password" id="password" autoComplete="off" {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Необходимо заполнить поле'
                                }
                            })} />
                            {
                                errors && <Message>{errors.password?.message}</Message>
                            }
                        </div>
                        <div>
                            <label htmlFor="password_confirmation">Подтверждение пароля</label>
                            <Input type="password" id="password_confirmation" autoComplete="off" />
                            {
                                //errors && <Message>{errors.phone?.message}</Message>
                            }
                        </div>
                    </div>
                </div>
                <Button type="submit">Зарегистрироваться</Button>
            </Form>
        </StyledSection>
    )
}

export default SignUp;

const Form = styled.form`
    width: calc(100% - 20px);
    max-width: 1024px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 0 30px 0 lightgray;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & > div {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
            gap: 20px;
        }

        & > div > div {
            width: calc(50% - 10px);
            display: flex;
            flex-direction: column;
            gap: 10px;
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
`
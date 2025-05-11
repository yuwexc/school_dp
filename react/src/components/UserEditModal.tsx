import { FC, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { User } from '../interfaces/user';
import { Level } from '../interfaces/level';

interface Props {
    user: User,
    isOpen: boolean,
    onClose: (value: SetStateAction<boolean>) => void,
    onSave: (userData: User) => Promise<void>
}

const UserEditModal: FC<Props> = ({ isOpen, onClose, onSave, user }) => {
    const [levels, setLevels] = useState<Level[] | null>(null);
    const [errorLevel, setErrorLevel] = useState<boolean>(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            id_user: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            phone: '',
            photo: '',
            score: null,
            role_id: 1,
            level_id: 1,
            created_at: null
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                id_user: user.id_user!,
                first_name: user.first_name!,
                last_name: user.last_name!,
                middle_name: user.middle_name || '',
                email: user.email!,
                phone: user.phone!,
                role_id: user.role?.id_role,
                level_id: user.level?.id_level
            });
        } else {
            reset({
                id_user: '',
                first_name: '',
                last_name: '',
                middle_name: '',
                email: '',
                phone: '',
                role_id: 1,
                level_id: 1
            });
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<User> = (data) => {
        onSave(data);
        onClose(false);
    };

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

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={() => onClose(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{user ? 'Редактировать пользователя' : 'Добавить пользователя'}</ModalTitle>
                    <CloseButton onClick={() => onClose(false)}>&times;</CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('id_user')} value={user.id_user!} />
                    <FormGrid>
                        <FormGroup>
                            <Label>Фамилия*</Label>
                            <Input
                                {...register('last_name', {
                                    required: {
                                        value: true, message: "Введите фамилию"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Zа-яА-ЯёЁ-]+$/i,
                                        message: "Некорректная фамилия"
                                    }
                                })}
                                $hasError={!!errors.last_name}
                                placeholder="Введите фамилию"
                            />
                            {errors.last_name && <ErrorText>{errors.last_name.message}</ErrorText>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Имя*</Label>
                            <Input
                                {...register('first_name', {
                                    required: {
                                        value: true, message: "Введите имя"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Zа-яА-ЯёЁ-]+$/i,
                                        message: "Некорректное имя"
                                    }
                                })}
                                $hasError={!!errors.first_name}
                                placeholder="Введите имя"
                            />
                            {errors.first_name && <ErrorText>{errors.first_name.message}</ErrorText>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Отчество</Label>
                            <Input
                                {...register('middle_name')}
                                placeholder="Введите отчество"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Email*</Label>
                            <Input
                                type="email"
                                {...register('email', {
                                    required: 'Введите email',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                        message: 'Некорректный email'
                                    }
                                })}
                                $hasError={!!errors.email}
                                placeholder="example@mail.com"
                            />
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Телефон*</Label>
                            <Input
                                type="tel"
                                {...register('phone', {
                                    required: { value: true, message: 'Обязательное поле' },
                                    pattern: {
                                        value: /^(?:\+7|8)\d{10}$/,
                                        message: 'Некорректный телефон'
                                    }
                                })}
                                $hasError={!!errors.phone}
                                placeholder="+79991234567"
                            />
                            {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Роль*</Label>
                            <Select {...register('role_id')}>
                                <option value="1">Студент</option>
                                <option value="2">Преподаватель</option>
                                <option value="3">Администратор</option>
                            </Select>
                        </FormGroup>

                        {
                            errorLevel &&
                            <FormGroup>
                                <Label>Уровень*</Label>
                                <Select {...register('level_id')}>
                                    <option value={''}></option>
                                    {
                                        levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_title} </option>)
                                    }
                                </Select>
                            </FormGroup>
                        }
                    </FormGrid>

                    <ButtonGroup>
                        <CancelButton type="button" onClick={() => onClose(false)}>
                            Отмена
                        </CancelButton>
                        <SaveButton type="submit">
                            Сохранить
                        </SaveButton>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default UserEditModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  line-height: 1;
  
  &:hover {
    color: #475569;
  }
`;

const Form = styled.form`
  padding: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: #f8fafc;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#6366f1'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)'};
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: #f8fafc;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4338ca;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
`;

const CancelButton = styled.button`
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e2e8f0;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(203, 213, 225, 0.3);
  }
`;
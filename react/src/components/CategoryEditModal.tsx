import { FC, SetStateAction, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Category } from '../interfaces/category';

interface Props {
    category: Category | null;
    isOpen: boolean;
    onClose: (value: SetStateAction<boolean>) => void;
    onSave: (categoryData: Category) => Promise<void>;
}

const CategoryEditModal: FC<Props> = ({ isOpen, onClose, onSave, category }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Category>({
        defaultValues: {
            id_category: null,
            category_name: '',
            created_at: null,
            updated_at: null
        }
    });

    useEffect(() => {
        if (category) {
            reset({
                id_category: category.id_category,
                category_name: category.category_name,
                created_at: category.created_at,
                updated_at: category.updated_at
            });
        } else {
            reset({
                id_category: null,
                category_name: '',
                created_at: null,
                updated_at: null
            });
        }
    }, [category, reset]);

    const onSubmit: SubmitHandler<Category> = (data) => {
        onSave(data);
        onClose(false);
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={() => onClose(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{category ? 'Редактировать категорию' : 'Добавить категорию'}</ModalTitle>
                    <CloseButton onClick={() => onClose(false)}>&times;</CloseButton>
                </ModalHeader>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('id_category')} />

                    <FormGroup>
                        <Label>Название категории*</Label>
                        <Input
                            {...register('category_name', {
                                required: {
                                    value: true,
                                    message: "Введите название категории"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "Максимальная длина 255 символов"
                                }
                            })}
                            $hasError={!!errors.category_name}
                            placeholder="Введите название категории"
                        />
                        {errors.category_name && <ErrorText>{errors.category_name.message}</ErrorText>}
                    </FormGroup>

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

export default CategoryEditModal;

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
  width: 500px;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
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
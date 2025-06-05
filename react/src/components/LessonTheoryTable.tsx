import { Dispatch, FC, JSXElementConstructor, ReactElement, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Message } from "../styles/forms";
import { ActionButton } from "./LineWord";
import LessonSectionHeader from "./LessonSectionHeader";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "./LessonWordsSection";
import { Columns, LessonText, Rows, TableElements, TableInterface } from "../interfaces/lesson";
import { ElementProps } from "../views/CreateLessonView";

interface Props {
    id: number,
    type: string,
    color: string,
    deleteHeaderElement: (id: number) => void,
    displayedHeaderElements: ReactElement<ElementProps, string | JSXElementConstructor<unknown>>[],
    setTheory: Dispatch<SetStateAction<(TableInterface | LessonText)[]>>
}

const LessonTheoryTable: FC<Props> = ({ id, color, deleteHeaderElement, setTheory, displayedHeaderElements }) => {

    const { register, handleSubmit, formState: { errors }, unregister } = useForm<FormData>();

    const [columns, setColumns] = useState<Columns[]>([{ id: 0 }]);
    const [rows, setRows] = useState<Rows[]>([{ id: 0 }]);

    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleDeleteColumn = (id: number) => {
        if (columns.length === 1) return;
        setColumns(prevState => prevState.filter(column => column.id !== id));

        unregister(`title-${id}-${id}`);

        rows.forEach(row => {
            unregister(`cell-${id}-${row.id}`);
        });
    }

    const handleDeleteRow = (id: number) => {
        if (rows.length === 1) return;
        setRows(prevState => prevState.filter(row => row.id !== id));

        columns.forEach(column => {
            unregister(`cell-${column.id}-${id}`);
        });
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {

        const transformData = (data: FormData): TableElements[] => {
            const rows: { [key: number]: TableElements } = {};
            let maxIndex = -1;

            for (const [key, value] of Object.entries(data)) {
                const [type, rowIndexStr] = key.split('-');
                const rowIndex = parseInt(rowIndexStr, 10);

                if (isNaN(rowIndex)) {
                    continue;
                }

                maxIndex = Math.max(maxIndex, rowIndex);

                if (!rows[rowIndex]) {
                    rows[rowIndex] = { title: '', cells: [] };
                }

                if (type === 'title') {
                    rows[rowIndex].title = value;
                } else if (type === 'cell') {
                    rows[rowIndex].cells.push(value);
                }
            }

            return Array.from({ length: maxIndex + 1 }, (_, i) => rows[i] || { title: '', cells: [] });
        };

        const outputArray = transformData(data);

        setTheory(prevState => prevState.filter(item => item.id != id));

        setTheory(prevState => [...prevState, {
            id: displayedHeaderElements.length,
            type: 'TABLE',
            elements: outputArray
        }]);

        setIsSaved(true);
    }

    const deleteTable = () => {
        setTheory(prevState => prevState.filter(item => item.id != id));
    }

    useEffect(() => setIsSaved(false), [rows, columns]);

    return (
        <Article $color={color + '3d'}>
            <LessonSectionHeader id={id} deleteElement={deleteHeaderElement} reset={deleteTable} title={'Таблица'} />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Table>
                    <thead>
                        <tr>
                            {
                                columns.map(column =>
                                    <th key={column.id}>
                                        <Input {...register(`title-${column.id}-${column.id}`, {
                                            required: {
                                                value: true, message: 'Заполните поле'
                                            }
                                        })}
                                            style={{ backgroundColor: 'transparent', border: '2px solid white', width: 'calc(100% - 24px)' }}
                                            type="text" placeholder={"Введите название столбца"} id={'title-' + column.id} />
                                        {
                                            errors[`title-${column.id}-${column.id}`] && <StyledMessage>{errors[`title-${column.id}-${column.id}`]?.message}</StyledMessage>
                                        }
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row) =>
                                <tr key={row.id}>
                                    {
                                        columns.map(column =>
                                            <td key={column.id}>
                                                <Input {...register(`cell-${column.id}-${row.id}`, {
                                                    required: {
                                                        value: true, message: 'Заполните поле'
                                                    }
                                                })}
                                                    style={{ backgroundColor: 'transparent', border: '2px solid white', width: 'calc(100% - 24px)' }}
                                                    type="text" placeholder={"Введите текст"} id={'cell-' + column.id + '-' + row.id} />
                                                {
                                                    errors[`cell-${column.id}-${row.id}`] && <StyledMessage>{errors[`cell-${column.id}-${row.id}`]?.message}</StyledMessage>
                                                }
                                            </td>
                                        )
                                    }
                                    <td>
                                        <DeleteButton onClick={() => handleDeleteRow(row.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26.4px" height="26.4px" viewBox="0 0 24 24" fill="none">
                                                <path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="white" />
                                                <path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="white" />
                                                <path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="white" />
                                            </svg>
                                        </DeleteButton>
                                    </td>
                                </tr>
                            )
                        }
                        <tr>
                            {
                                columns.map(column =>
                                    <td key={column.id}>
                                        <DeleteButton style={{ width: 'min-content' }} onClick={() => handleDeleteColumn(column.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26.4px" height="26.4px" viewBox="0 0 24 24" fill="none">
                                                <path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="white" />
                                                <path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="white" />
                                                <path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="white" />
                                            </svg>
                                        </DeleteButton>
                                    </td>
                                )
                            }
                        </tr>
                    </tbody>
                </Table>
                {
                    !isSaved ?
                        <FlexRow>
                            <Message style={{ fontWeight: '600', alignSelf: 'center' }}>Обязательно сохраните данные!</Message>
                        </FlexRow>
                        : null
                }
                <FlexRow>
                    <Button disabled={isSaved} type="submit" style={{ backgroundColor: color, minWidth: 'unset' }}>Сохранить</Button>
                    <Button as="div"
                        style={{ minWidth: 'unset', paddingBlock: 'unset' }}
                        onClick={() => setColumns(prevState => [...prevState, { id: columns[columns.length - 1].id + 1 }])}>
                        Добавить столбец
                    </Button>
                    <Button as="div"
                        style={{ minWidth: 'unset', paddingBlock: 'unset' }}
                        onClick={() => setRows(prevState => [...prevState, { id: rows[rows.length - 1].id + 1 }])}>
                        Добавить строку
                    </Button>
                </FlexRow>
            </Form>
        </Article>
    )
}

export default LessonTheoryTable;

const StyledMessage = styled(Message)`
    margin-top: 10px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const DeleteButton = styled(ActionButton)`
    & > svg {
        background-color: #d91e18;
    }

    &:disabled {
        cursor: unset;

        & > svg {
            background-color: #d65854;
        }
    }
`

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td, tr {
        padding: 10px;
        border: 1px solid #2d2d2d;
    }
`

const Article = styled.article<{ $color: string }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${props => props.$color};
    padding: 32px;
    border-radius: 10px;
`
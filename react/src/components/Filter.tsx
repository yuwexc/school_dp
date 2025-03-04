import styled from "styled-components";
import { Level } from "../interfaces/level";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { Message, Select } from "../styles/forms";
import { t } from "i18next";
import { Category } from "../interfaces/category";

interface Props {
    setLevel: Dispatch<SetStateAction<number | "">>
    setCategory: Dispatch<SetStateAction<number | "">>
}

const Filter: FC<Props> = ({ setLevel, setCategory }) => {

    const [levels, setLevels] = useState<Level[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [errorLevel, setErrorLevel] = useState<boolean>(true);
    const [errorCategory, setErrorCategory] = useState<boolean>(true);

    const levelRef = useRef<HTMLSelectElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

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

        fetch("https://dp-chernaev.xn--80ahdri7a.site/api/categories", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setErrorCategory(true);
                setCategories(result);
            })
            .catch(() => {
                setErrorCategory(false)
            });
    }

    useEffect(onLoad, []);

    return (
        <StyledFilter>
            <h3>Уровни</h3>
            {
                errorLevel &&
                <Select ref={levelRef} id="level" onChange={(e) => setLevel(Number(e.target.value))}>
                    <option value={''}></option>
                    {
                        levels && levels.map((level) => <option value={level.id_level} key={level.id_level}>{level.level_code} {level.level_title} {localStorage.getItem('INTERFACE_LANGUAGE') == 'ru' ? '- ' + level.level_name.toLocaleLowerCase() : null}</option>)
                    }
                </Select>
            }
            {
                !errorLevel && <Message>{t('error')}</Message>
            }
            <h3 style={{ marginTop: '12px' }}>Категории</h3>
            {
                errorCategory &&
                <Select ref={categoryRef} id="category" onChange={(e) => setCategory(Number(e.target.value))}>
                    <option value={''}></option>
                    {
                        categories && categories.map((category) => <option value={category.id_category} key={category.id_category}>{category.category_name} ({category.count})</option>)
                    }
                </Select>
            }
            {
                !errorCategory && <Message>{t('error')}</Message>
            }
            <Button onClick={() => {
                setCategory('')
                setLevel('')
                levelRef.current!.value = '';
                categoryRef.current!.value = '';
            }}>Сбросить</Button>
        </StyledFilter>
    )
}

export default Filter;

const Button = styled.button`
    color: #6c5ce7;
    font-weight: 600;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    width: fit-content;
    font-size: 16px;
    margin-top: 12px;
`

const StyledFilter = styled.div`
    min-width: 280px;
    border-radius: 12px;
    background-color: #f3f3f3;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    @media (max-width: 425px) {
        min-width: unset;
    }
`
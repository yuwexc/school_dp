import styled from "styled-components";
import { Button, Input, Message, Title } from "../styles/forms";
import { FC, ReactElement, useEffect, useState } from "react";
import { ElementProps } from "../views/CreateLessonView";
import LessonTheoryTable from "./LessonTheoryTable";
import LessonSectionHeader from "./LessonSectionHeader";
import LessonTheoryText from "./LessonTheoryText";
import { LessonText, TableInterface, Theory } from "../interfaces/lesson";

interface Props {
    id: number,
    type: string,
    addTheory: (newTheory: Theory) => void,
    deleteLessonTheory: (id: number) => void,
    deleteElement: (id: number) => void,
}

const LessonTheory: FC<Props> = ({ id, deleteElement, addTheory, deleteLessonTheory }) => {

    const [header, setHeader] = useState<string>('');

    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [displayedHeaderElements, setdisplayedHeaderElements] = useState<ReactElement<ElementProps>[]>([]);
    const [newElementId, setNewElementId] = useState<number>(0);

    const [theory, setTheory] = useState<(TableInterface | LessonText)[]>([]);

    const deleteHeaderElement = (id: number) => {
        setdisplayedHeaderElements((prevElements) =>
            prevElements.filter((element) => element.props.id !== id)
        );
    };

    const elements = new Map<string, ReactElement<ElementProps>>([
        ['TEXT', <LessonTheoryText
            id={newElementId}
            key={newElementId}
            type={'TEXT'}
            color={'#6c5ce7'}
            displayedHeaderElements={displayedHeaderElements}
            setTheory={setTheory}
            deleteHeaderElement={deleteHeaderElement}
        />],
        ['TABLE', <LessonTheoryTable
            id={newElementId}
            key={newElementId}
            type={'TABLE'}
            color={'#20bf6b'}
            displayedHeaderElements={displayedHeaderElements}
            setTheory={setTheory}
            deleteHeaderElement={deleteHeaderElement}
        />]
    ])

    const addHeaderSection = (type: string) => {
        setdisplayedHeaderElements((prevElements) => [
            ...prevElements,
            elements.get(type)!
        ]);

        setNewElementId((prevState) => prevState + 1);
    };

    useEffect(() => {
        setTheory(prevState => prevState.sort((a, b) => a.id - b.id));
        setIsSaved(false);
    }, [theory]);

    const save = () => {
        addTheory({
            id: id,
            type: 'THEORY',
            name: header || 'Теория',
            body: theory
        })

        setIsSaved(true);
    };

    return (
        <Intro>
            <LessonSectionHeader id={id} title={'Теория'} deleteElement={deleteElement} reset={deleteLessonTheory} />
            <Title style={{ fontSize: '20px' }}>Заголовок</Title>
            <Input value={header} onChange={(e) => setHeader(e.target.value)} id={"theory-" + id}></Input>
            {
                displayedHeaderElements.length > 0 && displayedHeaderElements.map(element => element)
            }
            <Title style={{ fontSize: '20px' }}>Добавить элемент:</Title>
            <FlexRow>
                <Button onClick={() => addHeaderSection('TEXT')} style={{ backgroundColor: '#6c5ce7', minWidth: 'unset' }}>Текст</Button>
                <Button onClick={() => addHeaderSection('TABLE')} style={{ backgroundColor: '#20bf6b', minWidth: 'unset' }}>Таблица</Button>
            </FlexRow>
            {
                !isSaved ?
                    <FlexRow>
                        <Message style={{ fontWeight: '600', alignSelf: 'center' }}>Обязательно сохраните данные!</Message>
                    </FlexRow>
                    : null
            }
            <Button disabled={isSaved} onClick={save}>Сохранить</Button>
        </Intro>
    )
}

export default LessonTheory;

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const Intro = styled.section`
    width: calc(100% - 64px);
    max-width: 1338px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);
    padding: 32px;
    gap: 20px;
    border-radius: 32px;

    @media (max-width: 1279px) {
        width: calc(100% - 64px);
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px);
        gap: 12px;
        border-radius: 24px;
        padding: 24px;
    }
`
import { FC } from "react";
import styled from "styled-components";
import { Theory, TheoryBodyItem, LessonText, TableInterface } from "../interfaces/lesson";
import { Title } from "../styles/forms";
import LessonTable from "./LessonTable";

const LessonTheoryStudentView: FC<{ theory: Theory }> = ({ theory }) => {

    const isTextItem = (item: TheoryBodyItem): item is LessonText => item.type === 'TEXT';
    const isTableItem = (item: TheoryBodyItem): item is TableInterface => item.type === 'TABLE';

    return (
        <Section>
            <Title style={{ fontSize: '103px', color: '#4b7bec' }}>THEORY</Title>
            <Name>{theory.name}</Name>
            {
                theory.body.map((item: TheoryBodyItem, index: number) => isTextItem(item) ?
                    <p style={{ fontSize: '22px' }} key={index}>{item.text}</p>
                    :
                    isTableItem(item) && <LessonTable table={item} key={index} />
                )
            }
        </Section>
    )
}

export default LessonTheoryStudentView;

const Name = styled.h3`
    font-size: 30px;
`

const Section = styled.section`
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
`
import { FC } from "react";
import styled from "styled-components";
import { Theory, TheoryBodyItem, LessonText, TableInterface } from "../interfaces/lesson";
import LessonTable from "./LessonTable";
import { LessonSectionTitle } from "../styles/lesson";

const LessonTheoryStudentView: FC<{ theory: Theory }> = ({ theory }) => {

    const isTextItem = (item: TheoryBodyItem): item is LessonText => item.type === 'TEXT';
    const isTableItem = (item: TheoryBodyItem): item is TableInterface => item.type === 'TABLE';

    return (
        <Section>
            <LessonSectionTitle style={{ color: '#4b7bec' }}>THEORY</LessonSectionTitle>
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

    @media (max-width: 426px) {
        font-size: 24px;
    }
`

const Section = styled.section`
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;

    @media (max-width: 1024px) {
        padding: 60px;
    }

    @media (max-width: 768px) {
        padding: 50px 40px;
    }

    @media (max-width: 426px) {
        padding: 30px 24px;

        & > p {
            font-size: 20px !important;
        }
    }
`
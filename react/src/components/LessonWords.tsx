import { FC, useState } from "react";
import { Word } from "../interfaces/lesson";
import styled from "styled-components";
import { Button } from "../styles/forms";
import FieldLoader from "./FieldLoader";
import { LessonSectionTitle } from "../styles/lesson";

const LessonWords: FC<{ words: Word[] }> = ({ words }) => {

    const [learn, setLearn] = useState<boolean>(true);

    return (
        <Section>
            <LessonSectionTitle style={{ color: '#20bf6b' }}>VOCABULARY</LessonSectionTitle>
            <p style={{ fontSize: '24px' }}>Study the meaning, pronunciation, and usage of the words presented in the lesson materials. Be prepared to use them in your sentences.</p>
            <Grid>
                {
                    words.map(word =>
                        <div key={word.id}>
                            <Number>{(word.id + 1).toString().padStart(2, '0')}</Number>
                            <WordLine>
                                <p style={{ textWrap: 'nowrap' }}>{word.russian} —</p>
                                {
                                    learn ?
                                        <p style={{ textWrap: 'nowrap' }}><span style={{ fontWeight: 'bold' }}>{word.english}</span> {word.transcription}</p>
                                        :
                                        <FieldLoader />
                                }
                            </WordLine>
                        </div>)
                }
            </Grid>
            <Learn onClick={() => setLearn(prevState => !prevState)}>
                {
                    learn ? 'Учить слова' : 'Открыть слова'
                }
            </Learn>
        </Section>
    )
}

export default LessonWords;

const Learn = styled(Button)`
    margin-top: 12px;
    background-color: #20bf6b;

    @media (max-width: 576px) {
        display: none;
    }
`

const WordLine = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 20px;

    @media (max-width: 576px) {
        flex-wrap: wrap;
        gap: 10px;
    }
`

const Number = styled.p`
    background-color: #20bf6b;
    border-radius: 6px;
    padding: 6px;
    color: white;
    font-variant-numeric: tabular-nums;

    @media (max-width: 576px) {
        display: none;
    }
`

const Grid = styled.div`
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;

    & > div {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    @media (max-width: 1286px) {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`

const Section = styled.section`
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    @media (max-width: 1024px) {
        padding: 60px;
    }

    @media (max-width: 768px) {
        padding: 50px 40px;
    }

    @media (max-width: 576px) {
        padding: 40px;
    }

    @media (max-width: 426px) {
        padding: 30px 24px;

        & > p {
            font-size: 20px !important;
        }
    }
`
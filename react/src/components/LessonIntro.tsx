import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { LessonInterface } from "../interfaces/lesson";

const LessonIntro: FC<{ lesson: LessonInterface }> = ({ lesson }) => {
    return (
        <Section>
            <Grid>
                <Greeting style={{ gridColumn: '1 / 3' }}>Welcome to the Lesson,</Greeting>
                <Flex>
                    <Greeting>"{lesson.lesson_name}"!</Greeting>
                    <Number>#{lesson.lesson_number}</Number>
                </Flex>
            </Grid>
            <SvgTopRight xmlns="http://www.w3.org/2000/svg" width="864" height="907" viewBox="0 0 864 907" fill="none">
                <path d="M1 1C76.5 4.33333 230.5 29.9 242.5 105.5C257.5 200 140 294 280.5 314C421 334 555.5 232.5 572 348.5C588.5 464.5 575.5 558.5 626.5 593.5C677.5 628.5 858 569 848 704.5C840 812.9 854.667 884.333 863 906.5" stroke="black" />
            </SvgTopRight>
            <SvgBottomLeft xmlns="http://www.w3.org/2000/svg" width="864" height="907" viewBox="0 0 864 907" fill="none">
                <path d="M1 1C76.5 4.33333 230.5 29.9 242.5 105.5C257.5 200 140 294 280.5 314C421 334 555.5 232.5 572 348.5C588.5 464.5 575.5 558.5 626.5 593.5C677.5 628.5 858 569 848 704.5C840 812.9 854.667 884.333 863 906.5" stroke="black" />
            </SvgBottomLeft>
        </Section>
    )
}

export default LessonIntro;

const Draw = keyframes`
    100% { stroke-dashoffset: 0; }
`

const SVG = styled.svg`
    position: absolute;
    stroke-dashoffset: 2500;
    stroke-dasharray: 2500;
    animation: ${Draw} 1s linear forwards;
    z-index: 1;

    & > path {
        stroke: #f7b731;
        stroke-width: 6;
    }
`

const SvgTopRight = styled(SVG)`
    top: -20%;
    right: -16%;
    transform: rotate(20deg);
`

const SvgBottomLeft = styled(SVG)`
    bottom: -1%;
    left: 0;
    transform: rotate(180deg);
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 11.2px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    align-items: start;
    z-index: 999;
`

const Greeting = styled.h1`
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 103px;
    color: white;

    @media (max-width: 1024px) {
        font-size: 84px;
    }

    @media (max-width: 768px) {
        font-size: 72px;
    }

    @media (max-width: 576px) {
        font-size: 60px;
    }
        
    @media (max-width: 426px) {
        font-size: 40px;
    }
`

const Number = styled(Greeting)`
    font-size: 280px;
    line-height: 0.81;
    color: #f7b731;

    @media (max-width: 768px) {
        font-size: 180px;
    }
`

const Section = styled.section`
    overflow: hidden;
    position: relative;
    height: calc(100dvh - 60px);
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    background-color: #2d2d2d;
    background-image: radial-gradient(#f7b731 2px, transparent 2px), radial-gradient(#f7b731 2px, #2d2d2d 2px);
    background-size: 120px 120px;
    background-position: 0 0, 60px 60px;
`
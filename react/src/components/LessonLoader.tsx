import styled, { keyframes } from "styled-components";

const LessonLoader = () => {
    return (
        <Section>
            <Loader />
            <Loader />
            <Loader />
            <Loader />
        </Section>
    )
}

export default LessonLoader;

const Section = styled.section`
    height: 100dvh;
    width: 100vw;
    background-color: #2d2d2d;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 100px;
`

const Animation = keyframes`
    100% { box-shadow: 0 0 0 40px #fff0 }
`

const Loader = styled.div`
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 0 #fff4;
    animation: ${Animation} 2s infinite linear;
    position: relative;

    &::before, &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: 0 0 0 0 #fff4;
        animation: inherit;
        animation-delay: -1s;
    }
    
    &:after {
        animation-delay: -0.5;
    }
`

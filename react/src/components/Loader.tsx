import styled, { keyframes } from "styled-components";

const Loader = () => {
    return (
        <SpanLoader></SpanLoader>
    )
}

export default Loader;

const flash = keyframes`
    0% {
        background-color: #FFF2;
        box-shadow: 20px 0 #FFF2, -20px 0 #FFF;
    }
    50% {
        background-color: #FFF;
        box-shadow: 20px 0 #FFF2, -20px 0 #FFF2;
    }
    100% {
        background-color: #FFF2;
        box-shadow: 20px 0 #FFF, -20px 0 #FFF2;
    }
`

const SpanLoader = styled.span`
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    animation: ${flash} 0.5s ease-out infinite alternate;
`
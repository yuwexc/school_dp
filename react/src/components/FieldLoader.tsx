import styled, { keyframes } from "styled-components";

const FieldLoader = () => {
    return (
        <StyledFieldLoader></StyledFieldLoader>
    )
}

export default FieldLoader;

const Animation = keyframes`
    0% {
        background-position: right;
    }
`

const StyledFieldLoader = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${Animation} 1.75s infinite linear;
`
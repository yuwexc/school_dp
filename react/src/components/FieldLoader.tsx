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
    background: linear-gradient(90deg, #0001 33%, #0003 50%, #0001 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${Animation} 1.75s infinite linear;
`
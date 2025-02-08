import { FC } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
    flexGrow?: number,
    borderRadius?: number
}

const FieldLoader: FC<Props> = ({ flexGrow, borderRadius }) => {
    return (
        <StyledFieldLoader $flexGrow={flexGrow} $borderRadius={borderRadius}></StyledFieldLoader>
    )
}

export default FieldLoader;

const Animation = keyframes`
    0% {
        background-position: right;
    }
`

const StyledFieldLoader = styled.div<{ $flexGrow?: number, $borderRadius?: number }>`
    ${$props => $props.$flexGrow ? 'flex-grow: 1;' : 'width: 100%;'}
    ${$props => $props.$borderRadius ? 'border-radius: 24px;' : null}
    display: inline-block;
    min-height: 100%;
    background: linear-gradient(90deg, #0000 33%, #0001 50%, #0000 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: ${Animation} 1.75s infinite linear;
`
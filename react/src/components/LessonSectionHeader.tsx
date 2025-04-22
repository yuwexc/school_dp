import styled from "styled-components";
import { Title } from "../styles/forms";
import { FC } from "react";

interface Props {
    id: number,
    title: string,
    deleteElement: (id: number) => void,
    reset: (id: number) => void
}

const LessonSectionHeader: FC<Props> = ({ id, title, deleteElement, reset }) => {
    return (
        <FlexRow style={{ gap: '24px' }}>
            <Title>{title}</Title>
            <StyledButton onClick={() => {
                reset(id);
                deleteElement(id);
            }}>удалить</StyledButton>
        </FlexRow>
    )
}

export default LessonSectionHeader;

const StyledButton = styled.button`
    color: #6c5ce7;
    font-weight: 600;
    align-self: center;
    border: 0;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;

    @media (max-width: 767px) {
        align-self: unset;
        margin-right: unset;
    }
`

const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
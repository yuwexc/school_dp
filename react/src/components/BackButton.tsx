import { FC } from "react";
import styled from "styled-components";

interface Props {
    onClick: () => void
}

const BackButton: FC<Props> = ({ onClick }) => {
    return (
        <Button onClick={onClick}></Button>
    )
}

export default BackButton;

const Button = styled.button`
    background-color: #ffffffb8;
    background-image: url(/public/images/back.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 0;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
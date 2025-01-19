import { FC } from "react";
import styled from "styled-components";

interface Props {
    children: string,
    lang: string,
    onClick: () => void
}

const LangugageButton: FC<Props> = ({ children, lang, onClick }) => {
    return (
        <Button onClick={onClick} $lang={lang}>
            <Span>{children}</Span>
        </Button>
    )
}

export default LangugageButton;

const Span = styled.span`
    background-color: #ffffffb8;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Button = styled.button<{ $lang: string }>`
    background-image: ${props => props.$lang == 'en' ? 'url(/images/uk.png)' : 'url(/images/russia.png)'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
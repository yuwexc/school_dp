import { FC } from "react";
import styled from "styled-components";
import { CardAchievementProps } from "./Achievements";

const Achievement: FC<CardAchievementProps> = ({ background, image, title, additional }) => {
    return (
        <Article $background={background}>
            <Info>
                <Title>{title}</Title>
                <p>{additional}</p>
            </Info>
            <img width={170} src={image} alt="image" />
        </Article>
    )
}

export default Achievement;

const Title = styled.h2`
    font-size: 48px;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;

    & > p {
        font-size: 18px;
    }
`

const Article = styled.article<{ $background: string }>`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 24px;
    padding: 24px;
    background-color: ${props => props.$background};
    border-radius: 24px;
`
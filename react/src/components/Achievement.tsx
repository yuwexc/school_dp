import { FC } from "react";
import styled from "styled-components";
import { AchievementItemInterface } from "../interfaces/requests";

const Achievement: FC<AchievementItemInterface> = ({ background, image, title, additional, subtitle }) => {
    return (
        <Article $background={background!}>
            <Info>
                <div>
                    <Title>{title}</Title>
                    {
                        subtitle && <Subtitle>{subtitle}</Subtitle>
                    }
                </div>
                <p>{additional}</p>
            </Info>
            <img width={170} src={image!} alt="image" />
        </Article>
    )
}

export default Achievement;

const Subtitle = styled.p`
    height: 28px;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: green;
    border-radius: 24px;
    color: white;
    font-weight: bolder;
    font-size: 24px;
`

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

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
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
import { FC } from "react";
import styled from "styled-components";
import { t } from "i18next";
import { AchievementItemInterface } from "../interfaces/achievement";

const Achievement: FC<AchievementItemInterface> = ({ background, image, title, additional, subtitle }) => {
    return (
        <Article $background={background!}>
            <Info>
                <div>
                    <Title>{title}</Title>
                    {
                        subtitle && <Subtitle>{subtitle}{t('dashboard.achievements.words')}</Subtitle>
                    }
                </div>
                <p>{additional}</p>
            </Info>
            <IMG src={image!} alt="image" />
        </Article>
    )
}

export default Achievement;

const IMG = styled.img`
    width: 170px;

    @media (577px <= width <= 768px) {
        width: 150px;
    }

    @media (425px <= width <= 576px) {
        width: 120px;
    }

    @media (425px >= width) {
        display: none;
    }
`

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
    text-wrap: nowrap;

    @media (577px <= width <= 768px) {
        font-size: 20px;
        padding: 8px;
    }

    @media (425px <= width <= 576px) {
        font-size: 16px;
        padding: 6px;
    }

    @media (425px >= width) {
        display: none;
    }
`

const Title = styled.h2`
    font-size: 48px;

    @media (577px <= width <= 768px) {
        font-size: 36px;
    }

    @media (425px <= width <= 576px) {
        font-size: 30px;
    }

    @media (425px >= width) {
        font-size: 24px;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;

    & > p {
        font-size: 18px;
        text-wrap: nowrap;

        @media (577px <= width <= 768px) {
            font-size: 16px;
        }

        @media (425px <= width <= 576px) {
            font-size: 14px;
        }
    }

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
            
    @media (425px >= width) {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
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

    @media (577px <= width <= 768px) {
        padding: 20px 24px;
        border-radius: 24px;
        gap: 20px;
    }

    @media (425px <= width <= 576px) {
        padding: 16px 20px;
        border-radius: 20px;
        gap: 16px;
    }

    @media (425px >= width) {
        padding: 12px 16px;
        border-radius: 16px;
        gap: 12px;
    }
`
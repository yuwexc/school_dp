import styled from "styled-components";
import Achievement from "./Achievement";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { State } from "../interfaces/requests";
import FieldLoader from "./FieldLoader";
import { AchievementItemInterface } from "../interfaces/achievement";
import { useTranslation } from "react-i18next";

const Achievements = () => {

    const achievements = useSelector<RootState, AchievementItemInterface[] | null>((state) => state.achievements.achievements);
    const status = useSelector((state: State) => state.achievements.status);
    const { t } = useTranslation();

    const items: AchievementItemInterface[] = [
        {
            background: '#fdebd0',
            image: '/images/book.png',
            additional: t('dashboard.achievements.lessons')
        },
        {
            background: '#f4ecf7',
            image: '/images/star.png',
            additional: t('dashboard.achievements.score')
        },
        {
            background: '#eafaf1',
            image: '/images/videogames.png',
            additional: t('dashboard.achievements.progress')
        }
    ]

    return (
        <Section>
            {
                status === 'loading' ?
                    <>
                        <FieldLoader flexGrow={1} borderRadius={24} />
                        <FieldLoader flexGrow={1} borderRadius={24} />
                        <FieldLoader flexGrow={1} borderRadius={24} />
                    </>
                    :
                    achievements && achievements.map((item, i) => <Achievement
                        background={items[i].background}
                        image={items[i].image}
                        title={item.title}
                        subtitle={item.subtitle}
                        additional={items[i].additional}
                        key={i}
                    />)
            }
        </Section>
    )
}

export default Achievements;

const Section = styled.section`
    min-height: 218px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    @media (577px <= width <= 768px) {
        gap: 20px;
    }

    @media (425px <= width <= 576px) {
        gap: 16px;
    }

    @media (425px >= width) {
        flex-direction: column;
        gap: 12px;
    }
`
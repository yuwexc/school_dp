import styled from "styled-components";
import Achievement from "./Achievement";

export interface CardAchievementProps {
    background: string,
    image: string,
    title: string,
    additional: string
}

const Achievements = () => {

    const achievements: CardAchievementProps[] = [
        {
            background: '#fdebd0',
            image: '/images/book.png',
            title: '12',
            additional: 'Completed lessons',
            
        },
        {
            background: '#f4ecf7',
            image: '/images/star.png',
            title: '12',
            additional: 'Average score',
            
        },
        {
            background: '#eafaf1',
            image: '/images/videogames.png',
            title: '12',
            additional: 'Progress',
            
        },
    ];

    return (
        <Section>
            {
                achievements && achievements.map((item, i) => <Achievement
                    background={item.background}
                    image={item.image}
                    title={item.title}
                    additional={item.additional}
                    key={i}
                />)
            }
        </Section>
    )
}

export default Achievements;

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
`
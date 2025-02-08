import styled from "styled-components";
import Achievement from "./Achievement";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { AchievementItemInterface, State } from "../interfaces/requests";
import { fetchAchievement } from "../features/achievementsSlice";
import { useEffect } from "react";
import FieldLoader from "./FieldLoader";

const Achievements = () => {

    const dispatch = useDispatch<AppDispatch>();
    const achievements = useSelector<RootState, AchievementItemInterface[] | null>((state) => state.achievements.achievements);
    const status = useSelector((state: State) => state.achievements.status);

    useEffect(() => {
        dispatch(fetchAchievement());
    }, [dispatch]);

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
                        background={item.background}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                        additional={item.additional}
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
`
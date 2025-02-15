import { FC } from "react";
import { Level } from "../interfaces/level";
import styled from "styled-components";

interface Props {
    level: Level
}

const CourseLevel: FC<Props> = ({ level }) => {
    return (
        <LevelBlock>
            <p style={{ fontSize: '24px' }}>{level.level_code}</p>
        </LevelBlock>
    )
}

export default CourseLevel;

const LevelBlock = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 50%;
`
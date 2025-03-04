import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Expelled = () => {

    const { t } = useTranslation();

    return (
        <ExpelledBlock>
            <p style={{ fontSize: '14px' }}>{t('access.expelled')}</p>
        </ExpelledBlock>
    )
}

export default Expelled;

const ExpelledBlock = styled.div`
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #ffd7d7;
    border: 1px solid palevioletred;
    border-radius: 18px;

    @media (576px >= width) {
        height: 35px;
        min-width: 130px;
    }
`
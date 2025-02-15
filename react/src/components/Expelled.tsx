import styled from "styled-components";

const Expelled = () => {
    return (
        <ExpelledBlock>
            <p style={{ fontSize: '14px' }}>Expelled</p>
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
`
import styled from "styled-components";

const Home = () => {
    return (
        <StyledMain>
            Home
        </StyledMain>
    )
}

export default Home;

const StyledMain = styled.main`
    height: 100%;
    padding: 28px;
    background-color: white;
    display: grid;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    @media (577px <= width <= 768px) {
        padding: 24px;
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
        gap: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
        gap: 12px;
    }
`
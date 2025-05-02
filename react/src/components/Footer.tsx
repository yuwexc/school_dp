import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter>
            <p style={{ color: 'white' }}>footer</p>
            <p style={{ color: 'white' }}>footer</p>
        </StyledFooter>
    )
}

export default Footer;

const StyledFooter = styled.footer`
    flex: 0 0 auto;
    margin-inline: 10px;
    padding: 30px;
    background-color: #2d2d2d;
    border-radius: 40px 40px 0 0;
`
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <StyledFooter>
            <FooterSection>
                <NavLink to={'/'}>{t('header.main')}</NavLink>
                <NavLink to={'/courses'}>{t('header.courses')}</NavLink>
                <NavLink to={'/dashboard'}>{t('header.profile')}</NavLink>
            </FooterSection>
            <FooterSection>
                <p style={{ color: 'white' }}>limn@englishschool.com</p>
                <p style={{ color: 'white' }}>+7 (123) 456-78-90</p>
            </FooterSection>
            <p style={{ color: 'white' }}>
                © {new Date().getFullYear()} {t('footer.rights')}
            </p>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    flex: 0 0 auto;
    margin-inline: 10px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 40px 40px 35px 40px;
    background-color: #2d2d2d;
    border-radius: 40px 40px 0 0;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const FooterSection = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;

    @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const NavLink = styled(Link)`
    color: white;

    &:hover {
        text-decoration: underline;
    }
`;
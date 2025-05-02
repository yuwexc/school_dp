import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { setLanguage } from "../../public/locales/Language";
import LangugageButton from "./LanguageButton";

const Header = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    const links = [
        { id: 1, link: '/', text: t('header.main') },
        { id: 2, link: '/courses', text: t('header.courses') },
        //{ id: 3, link: '/topics', text: t('header.topics') },
        { id: 4, link: '/dashboard', text: t('header.profile') },
    ]

    return (
        <StyledHeader>
            <Nav>
                {
                    links.map((link) => <HeaderLink to={link.link} key={link.id}>{link.text}</HeaderLink>)
                }
                <Language style={{ backgroundColor: 'white', borderRadius: '25px', padding: '5px' }}>
                    <StyledLangugageButton lang="en" onClick={() => changeLanguage("en")}>EN</StyledLangugageButton>
                    <StyledLangugageButton lang="ru" onClick={() => changeLanguage("ru")}>RU</StyledLangugageButton>
                </Language>
            </Nav>
        </StyledHeader>
    )
}

export default Header;

const StyledLangugageButton = styled(LangugageButton)`
    border: 1px solid #2d2d2d !important;
`

export const Language = styled.div`
    display: flex;
    gap: 5px;

    @media (width <=768px) {
        display: none;
    }
`

const Animation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}`

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 40px);
    height: 8dvh;
    background: linear-gradient(-90deg, #f7b731, #9c9be3);
	background-size: 400% 400%;
	animation: ${Animation} 60s ease infinite;
    border-radius: 0 0 40px 40px;
    padding: 10px;
    margin-inline: 10px;
    z-index: 999;

    @media (width <=1024px) {
        & {
            padding: 10px;
        }
    }

    @media (width <=768px) {
        & {
            height: unset;
        }
    }
`;

const HeaderLink = styled(Link)`
    flex-grow: 1;
    height: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background .4s, color .4s;
    color: #f9f9f9;

    &:first-child {
        border-radius: 5px 5px 5px 20px;
    }

    &:hover {
        background-color: #f9f9f957;
        color: #2d2d2d;
    }

    @media (width <=1024px) {
        & {
            width: 100%;
        }
    }
`

const Nav = styled.nav`
    // background-color: #f9f9f9;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    border-radius: 10px 10px 30px 30px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    @media (width <=1024px) {
        & {
            width: calc(100% - 40px);
        }
    }

    @media (width <=768px) {
        & {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
        }
    }
`
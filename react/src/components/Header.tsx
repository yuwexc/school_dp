import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {

    const links = [
        { id: 1, link: '/', text: 'Главная' },
        { id: 2, link: '/courses', text: 'Курсы' },
        { id: 3, link: '/topics', text: 'По категориям' },
        { id: 4, link: '/profile', text: 'Личный кабинет' },
    ]

    return (
        <header>
            <Nav>
                {
                    links.map((link) => <HeaderLink to={link.link} key={link.id}>{link.text}</HeaderLink>)
                }
            </Nav>
        </header>
    )
}

export default Header;

const HeaderLink = styled(Link)`
    width: calc(25% - 5px);
    height: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background .4s;

    &:hover {
        background-color:#e4e4e4;
    }

    @media (width <=1024px) {
        & {
            width: 100%;
        }
    }
`

const Nav = styled.nav`
    background-color: #f9f9f9;
    height: calc(100% - 20px);
    width: 80%;
    border-radius: 10px;
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

    @media (width <=376px) {
        & {
            grid-template-columns: 1fr;
        }
    }
`
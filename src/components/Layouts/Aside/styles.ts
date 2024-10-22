import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
    grid-area: AS;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    background-color: ${props => props.theme.colors.white};
    box-shadow: -21px -2px 49px 0px rgba(0,0,0,0.3);

    @media (max-width: 1000px) {
        display: none;
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;

    li {
        list-style: none;
        width: 100%;
    }
`;

export const MenuItem = styled(Link)`
    display: flex;
    margin-top: 15px;
    font-size: 23px;
    color: ${props => props.theme.colors.darkblue};
    text-decoration: none;
    align-items: center;
    cursor: pointer;

    &:hover {
        transition: .4s all;
        color: ${props => props.theme.colors.primary};
    }

    p {
        margin-left: 15px;
        font-size: 16px;
    }
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')}; 
    transition: max-height 0.4s ease-in-out;
    margin-left: 25px;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-top: 5px;
        font-size: 14px;
    }
`;

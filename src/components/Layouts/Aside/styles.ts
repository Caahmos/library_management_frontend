import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
    grid-area: AS;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 30px;
    background-color: ${props => props.theme.colors.primary};

    @media (max-width: 800px) {
        display: none;
    }
`;

export const Brand = styled.h2`
    color: ${props => props.theme.colors.success};
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.gray};

    li {
        list-style: none;
        width: 100%;
    }
`;

export const TitleContainer = styled.p`
    color: ${props => props.theme.colors.gray};
`;

export const CircleIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.secondary};
`

export const MenuItem = styled(Link)`
    display: flex;
    align-items: center;
    margin-top: 15px;
    font-size: 23px;
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    padding: 8px;
    cursor: pointer;
    
    svg {
        color: ${props => props.theme.colors.white};
        font-size: 16px; 
    }

    &:hover {
        transition: ease .4s all;
        color: ${props => props.theme.colors.success}; 
        
        svg {
            color: ${props => props.theme.colors.black}; 
        }

        ${CircleIcon} {
            background-color: ${props => props.theme.colors.success}; 
        }
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
    color: ${props => props.theme.colors.white}; 

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-top: 5px;
        margin-bottom: 15px;
        font-size: 14px;
    }
`;

export const LinkItem = styled(Link)`
    color: ${props => props.theme.colors.white}; 
    text-decoration: none;

    &:hover {
        transition: ease .4s all;
        color: ${props => props.theme.colors.success}; 
    }
`


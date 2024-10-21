import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.aside`
    grid-area: AS;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: ${props => props.theme.colors.white};
    box-shadow: -21px -2px 49px 0px rgba(0,0,0,0.3);
    -webkit-box-shadow: -21px -2px 49px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: -21px -2px 49px 0px rgba(0,0,0,0.3);

    @media (max-width: 1000px) {
    display: none;
}
`

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
`
export const MenuItem = styled(Link)`
    display: flex;
    margin-top: 15px;
    font-size: 23px;
    color: ${props => props.theme.colors.darkblue};
    text-decoration: none;
    align-items: center;

    & :hover{
        transition: .4s all;
        color: ${props => props.theme.colors.primary};
    }

    p {
        margin-left: 15px;
        font-size: 16px;
    }
`
export const Theme = styled.footer`

`
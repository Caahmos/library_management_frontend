import styled from 'styled-components';

export const Container = styled.div`
    font-size: 25px;
    color: ${props => props.theme.colors.gray};
    height: 70px;
    padding: 20px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

    & :hover{
        color: ${ props => props.theme.colors.success};
        transition: .4s all;    
    }
`
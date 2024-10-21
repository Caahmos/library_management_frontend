import styled from 'styled-components'

export const Container = styled.header`
    grid-area: HD;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.darkblue};

`

export const Profile = styled.div`
    display: flex;
    padding: 0 20px;
    align-items: center;
`

export const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    > p {
        font-size: 0.7rem;
    };

    > span {
        font-weight: bold;
    }
`
export const Button = styled.div`
    margin-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
        font-size: 1.3rem;
        margin-right: 5px;
    }

    &:hover {
        cursor: pointer;
    }
`
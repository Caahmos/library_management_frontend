import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
`;

export const ImageContainer = styled.div`
    width: 40%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
        width: 40%;
    }
`

export const InfoContainer = styled.div`
    width: 55%;
    height: 400px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.gray} 
`


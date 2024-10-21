import styled from "styled-components";
import background from '../../../../assets/imgs/background.jpg'

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${background});
    background-size: cover;
`;


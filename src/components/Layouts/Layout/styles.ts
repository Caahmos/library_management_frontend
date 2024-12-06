import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 260px auto;
    grid-template-rows: 80px auto;
    grid-template-areas: 
    "AS HD"
    "AS CT";

    @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
    "HD HD"
    "CT CT";
}
`
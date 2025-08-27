import styled from 'styled-components'

export const Container = styled.div`
    height: 100dvh;
    display: grid;
    grid-template-columns: 260px auto;
    grid-template-rows: 80px auto;
    grid-template-areas: 
    "AS HD"
    "AS CT";

    @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
    "HD HD"
    "CT CT";
}
`
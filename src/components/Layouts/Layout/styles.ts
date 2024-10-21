import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 200px auto;
    grid-template-rows: 50px auto;
    grid-template-areas: 
    "HD HD"
    "AS CT";

    @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
    "HD HD"
    "CT CT";
}
`
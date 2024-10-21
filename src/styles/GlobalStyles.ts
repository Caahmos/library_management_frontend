import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Nunito", sans-serif;

        h3 {
            font-size: 1rem;
        }
    }

    html, border-style, #root{
        height: 100vh;
    }

    *, button, input{
        border: 0;
        outline: 0;
        font-family: "Roboto", sans-serif;
    }

    button{
        cursor: pointer;
    }

`
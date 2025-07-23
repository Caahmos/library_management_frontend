import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`;

export const IconWrapper = styled.div`
    position: absolute;
    left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c4c4c4;

    &:hover, &:focus {
        color: ${props => props.theme.colors.primary};
    }
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 18px 18px 18px 40px; 
    margin: 3px 0 3px 0;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    &:hover, &:focus {
        border: 1px solid ${props => props.theme.colors.success};
    }
`;

export const Label = styled.label`
  text-align: left;
  margin-bottom: 5px;
`
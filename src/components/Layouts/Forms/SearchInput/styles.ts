import styled from "styled-components";

export const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 500px;
`;

export const IconWrapper = styled.div`
    position: absolute;
    left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.success};
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 12px 12px 12px 40px; 
    margin: 3px 0 3px 0;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.success};
`;

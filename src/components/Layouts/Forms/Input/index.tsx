import React from "react";
import type { InputHTMLAttributes } from 'react';
import { StyledInputContainer, StyledInput, IconWrapper, Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode; 
}

const InputForm: React.FC<InputProps> = ({ label, icon, ...props }) => {
    return (
        <Container>
            {label && <label>{label}</label>}
            <StyledInputContainer>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <StyledInput {...props} />
            </StyledInputContainer>
        </Container>
    );
}

export default InputForm;

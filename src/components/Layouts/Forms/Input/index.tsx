import React, { InputHTMLAttributes } from "react";
import { StyledInputContainer, StyledInput, IconWrapper } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode; 
}

const InputForm: React.FC<InputProps> = ({ label, icon, ...props }) => {
    return (
        <>
            {label && <label>{label}</label>}
            <StyledInputContainer>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <StyledInput {...props} />
            </StyledInputContainer>
        </>
    );
}

export default InputForm;

import React, { InputHTMLAttributes } from "react";
import { StyledInputContainer, StyledInput, IconWrapper } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode; 
}

const SearchInput: React.FC<InputProps> = ({ icon, ...props }) => {
    return (
        <>
            <StyledInputContainer>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <StyledInput {...props} />
            </StyledInputContainer>
        </>
    );
}

export default SearchInput;

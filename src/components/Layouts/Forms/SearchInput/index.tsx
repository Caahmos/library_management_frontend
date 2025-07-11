import React, { useEffect, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import {
    Container,
    StyledInputContainer,
    StyledInput,
    IconWrapper,
    Dropdown,
    CloseButton,
    SelectMethod,
} from "./styles";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import BookSearch from "../../BookSearch";
import { IoCloseSharp } from "react-icons/io5";
import { useHandleSearch } from "../../../../hooks/useHandleSearch";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    searchResults?: Biblio[];
    isOpen: boolean;
    method: string;
    onChangeMethod: (value: string) => void;
}

const SearchInput: React.FC<InputProps> = ({
    icon,
    searchResults,
    isOpen,
    method,
    onChangeMethod,
    ...props
}) => {
    const { close } = useHandleSearch();
    const containerRef = useRef<HTMLDivElement>(null);

    const clearInput = () => {
        if (props.onChange) {
            const event = {
                target: { value: "" },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            props.onChange(event);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                close();
                clearInput();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <StyledInputContainer>
                {icon && <IconWrapper>{icon}</IconWrapper>}

                <StyledInput {...props} />

                <SelectMethod
                    value={method}
                    onChange={(e) => onChangeMethod(e.target.value)}
                >
                    <option value="title">Título</option>
                    <option value="author">Autor</option>
                    <option value="barcode">Código</option>
                </SelectMethod>

                <CloseButton
                    onClick={() => {
                        close();
                        clearInput();
                    }}
                >
                    <IoCloseSharp />
                </CloseButton>
            </StyledInputContainer>

            <Dropdown $isopen={isOpen}>
                {searchResults &&
                    searchResults.map((biblio) => (
                        <BookSearch
                            key={biblio.bibid}
                            id={biblio.bibid}
                            title={biblio.title}
                            author={biblio.author}
                            img={
                                biblio.BiblioMedia?.[0]?.imageUrl ||
                                "semcapa.png"
                            }
                            rank={biblio.BiblioMedia?.[0]?.rank || 0}
                        />
                    ))}
            </Dropdown>
        </Container>
    );
};

export default SearchInput;

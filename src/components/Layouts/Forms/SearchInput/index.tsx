import React, { InputHTMLAttributes } from "react";
import { Container, StyledInputContainer, StyledInput, IconWrapper, Dropdown } from "./styles";
import { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import BookSearch from "../../BookSearch";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    searchResults?: Biblio[]; 
    isOpen: boolean | false;
}

const SearchInput: React.FC<InputProps> = ({ icon, searchResults, isOpen, ...props }) => {
    return (
        <Container>
            <StyledInputContainer>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <StyledInput {...props} />
            </StyledInputContainer>

            <Dropdown isOpen={isOpen}>
            {
            searchResults && searchResults.map((biblio) => (
                <BookSearch
                  id={biblio.bibid}
                  title={biblio.title}
                  author={biblio.author}
                  img={biblio.BiblioMedia && biblio.BiblioMedia[0]?.imageUrl || 'semcapa.png'}
                  rank={biblio.BiblioMedia && biblio.BiblioMedia[0]?.rank || 0}
                />
            ))
          }
            </Dropdown>
        </Container>
    );
}

export default SearchInput;

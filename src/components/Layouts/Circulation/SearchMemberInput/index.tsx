import React, { useState, useEffect } from "react";
import api from "../../../../utils/api";
import type { InputHTMLAttributes } from "react";
import {
    Container,
    StyledInputContainer,
    StyledInput,
    IconWrapper,
    CloseButton,
    SelectMethod,
    InputContainer,
    ResultsContainer,
} from "./styles";
import { IoCloseSharp } from "react-icons/io5";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import MemberItem from "../MemberItem";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

const SearchMemberInput: React.FC<InputProps> = ({ icon }) => {
    const [members, setMembers] = useState<ViewMembersRequest[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [method, setMethod] = useState("name");
    const [hasSearched, setHasSearched] = useState(false);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get(`/member/search?method=${method}&data=${searchValue}&limit=${25}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                Accept: "application/json",
            },
        })
            .then((response) => {
                const result = response.data.foundMember;
                const formatted = Array.isArray(result) ? result : result ? [result] : [];
                setMembers(formatted);
                setHasSearched(true);
            })
            .catch((error) => {
                console.error("Erro na busca:", error);
                setMembers([]);
                setHasSearched(true);
            });
    }, [searchValue, method, token]);

    const handleClose = () => {
        setSearchValue("");
        setMembers([]);
        setHasSearched(false);
    };

    return (
        <Container>
            <InputContainer>
                <StyledInputContainer>
                    {icon && <IconWrapper>{icon}</IconWrapper>}

                    <StyledInput
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Digite para buscar"
                    />

                    <SelectMethod
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="name">Nome</option>
                        <option value="barcode">Código</option>
                        <option value="email">Email</option>
                    </SelectMethod>

                    <CloseButton onClick={handleClose}>
                        <IoCloseSharp />
                    </CloseButton>
                </StyledInputContainer>
            </InputContainer>

            <ResultsContainer>
                {members.length > 0 ? (
                    members.map((member) => (
                        <MemberItem
                            key={member.mbrid}
                            mbrid={member.mbrid}
                            first_name={member.first_name}
                            barcode_nmbr={member.barcode_nmbr}
                            imageUrl={member.imageUrl}
                        />
                    ))
                ) : (
                    hasSearched && <span>Nenhum membro encontrado...</span>
                )}
            </ResultsContainer>
        </Container>
    );
};

export default SearchMemberInput;

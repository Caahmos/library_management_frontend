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
    Button,
    BookInfo,
    BookSection,
    BookImage,
    BookTitle,
    Image,
    TextContainer,
    Author,
    DateBook,
    InfoItems
} from "./styles";
import { IoCloseSharp } from "react-icons/io5";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import MemberItem from "../MemberItem";
import type { Biblio, BiblioCopy } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import { FaUserClock } from "react-icons/fa";
import type { Copies } from "../../../../model/Biblio/BiblioCopy/Copies";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

const SearchCheckinInput: React.FC<InputProps> = ({ icon }) => {
    const [book, setBook] = useState<Biblio[]>([]);
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [searchValue, setSearchValue] = useState("");
    const [copy, setCopy] = useState<BiblioCopy>();
    const [hasSearched, setHasSearched] = useState(false);
    const defaultImage = 'http://localhost:5000/imgs/biblio/semcapa.png';
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.get(`/biblio/search?method=barcode&data=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(searchValue);
                console.log(response.data.biblios);
                setBook(response.data.biblios);
                findMember(response.data.biblios, searchValue);

                api.get(`/biblio/detail/${response.data.biblios[0].bibid}`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                })
                    .then((response) => {
                        setBookInfo(response.data.biblio);
                        const imageUrl = response.data.biblio.BiblioMedia?.[0]?.imageUrl;
                        console.log(copy)
                        setImageSrc(imageUrl
                            ? `http://localhost:5000/imgs/biblio/${imageUrl}`
                            : defaultImage
                        );
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        console.log(searchValue)
    }, [searchValue])

    const handleClose = () => {
        setSearchValue("");
        setBook([]);
        setHasSearched(false);
    };

    const findMember = (biblio: Biblio[] ,barcode_nmbr: string) => {
        const copyFinded = biblio[0].biblio_copy.find((copy) => {
            return copy.barcode_nmbr == barcode_nmbr
        })

        // console.log('OLHA');
        // console.log(copyFinded);
        setCopy(copyFinded);
    };

    return (
        <Container>
            <InputContainer onSubmit={handleSearch}>
                <StyledInputContainer>
                    {icon && <IconWrapper>{icon}</IconWrapper>}

                    <StyledInput
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Digite o tombo do livro"
                    />

                    <CloseButton onClick={handleClose}>
                        <IoCloseSharp />
                    </CloseButton>
                </StyledInputContainer>
                <Button type="submit">Procurar</Button>
            </InputContainer>

            <ResultsContainer>
                {
                    bookInfo && bookInfo.BiblioMedia && (
                        <BookSection>
                            <BookImage>
                                <Image image={imageSrc} />
                                <BookTitle>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</BookTitle>
                                <Author>por {bookInfo.author}</Author>
                                <InfoItems>
                                    <DateBook><FaUserClock />{book[0].biblio_copy && book[0].biblio_copy.length >= 0 && copy &&
                                        <p>
                                            {copy.mbrid}
                                        </p>        
                                    }
                                    </DateBook>
                                </InfoItems>
                            </BookImage>
                            <BookInfo>
                                <TextContainer>
                                    <BookTitle>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</BookTitle>
                                </TextContainer>
                            </BookInfo>
                        </BookSection>)
                }
            </ResultsContainer>
        </Container>
    );
};

export default SearchCheckinInput;

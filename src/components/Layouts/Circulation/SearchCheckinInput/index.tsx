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
    FingerprintIcon,
    InfoItems,
    ObservationContent,
    ObservationText,
    ObservationTitle,
    Title,
    ButtonCheckin
} from "./styles";
import { IoCloseSharp } from "react-icons/io5";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import MemberItem from "../MemberItem";
import type { Biblio, BiblioCopy } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import { FaUserClock } from "react-icons/fa";
import type { Copies } from "../../../../model/Biblio/BiblioCopy/Copies";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import type { AxiosError } from "axios";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

const SearchCheckinInput: React.FC<InputProps> = ({ icon }) => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [book, setBook] = useState<Biblio[]>([]);
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [searchValue, setSearchValue] = useState("");
    const [member, setMember] = useState<ViewMembersRequest>();
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
                        console.log(member);
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

    const findMember = (biblio: Biblio[], barcode_nmbr: string) => {
        const copyFinded = biblio[0].biblio_copy.find((copy) => {
            return copy.barcode_nmbr == barcode_nmbr
        });

        api.get(`/member/detail/${copyFinded?.mbrid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMember(response.data.member);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleCheckIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let msgText = '';
        let msgType = '';

        try {
            console.log(searchValue);
            const response = await api.post('/bibliohist/checkin', {barcode_nmbr: searchValue});

            msgText = response.data.message;
            msgType = 'success';

            navigate(`/circulation`);
        } catch (error) {
            const err = error as AxiosError;
            console.error(err);
            if (err.response && err.response.data) {
                msgText = (err.response.data as { message: string }).message;
            } else {
                msgText = 'Erro desconhecido';
            }
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
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
                                    <DateBook><FaUserClock />{book[0].biblio_copy && book[0].biblio_copy.length >= 0 && member &&
                                        <p>
                                            {member?.first_name + ' ' + member?.last_name}
                                        </p>
                                    }
                                    </DateBook>
                                    <DateBook><FingerprintIcon />{book[0].biblio_copy && book[0].biblio_copy.length >= 0 && member &&
                                        <p>
                                            {member?.barcode_nmbr}
                                        </p>
                                    }
                                    </DateBook>
                                </InfoItems>
                            </BookImage>
                            <BookInfo>
                                <ObservationContent onSubmit={handleCheckIn}>
                                    <Title>Devolver o livro</Title>
                                    <ObservationTitle>Deseja adicionar um observação?</ObservationTitle>
                                    <ObservationText></ObservationText>
                                    <ButtonCheckin>Devolver</ButtonCheckin>
                                </ObservationContent>
                            </BookInfo>
                        </BookSection>)
                }
            </ResultsContainer>
        </Container>
    );
};

export default SearchCheckinInput;

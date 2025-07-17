import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import { FaUserClock } from "react-icons/fa";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import type { AxiosError } from "axios";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const SearchCheckinInput: React.FC<InputProps> = ({ icon }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlBarcode = searchParams.get("barcode_nmbr");
  const [searchValue, setSearchValue] = useState("");
  const [book, setBook] = useState<Biblio[]>([]);
  const [bookInfo, setBookInfo] = useState<Biblio>();
  const [member, setMember] = useState<ViewMembersRequest>();
  const [imageSrc, setImageSrc] = useState("http://localhost:5000/imgs/biblio/semcapa.png");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const token = localStorage.getItem("@library_management:token") || "";

  const fetchBookData = async (barcode: string) => {
    try {
      const { data } = await api.get(`/biblio/search?method=barcode&data=${barcode}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      });

      const foundBook = data.biblios?.[0];
      if (!foundBook) return;

      setBook(data.biblios);
      setSearchValue(barcode);
      await fetchBookDetail(foundBook.bibid);
      await fetchMember(data.biblios, barcode);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookDetail = async (bibid: number) => {
    try {
      const { data } = await api.get(`/biblio/detail/${bibid}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      });

      setBookInfo(data.biblio);
      const imageUrl = data.biblio.BiblioMedia?.[0]?.imageUrl;
      setImageSrc(imageUrl ? `http://localhost:5000/imgs/biblio/${imageUrl}` : imageSrc);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMember = async (biblio: Biblio[], barcode_nmbr: string) => {
    const copy = biblio[0]?.biblio_copy?.find(c => c.barcode_nmbr === barcode_nmbr);
    if (!copy?.mbrid) return;

    try {
      const { data } = await api.get(`/member/detail/${copy.mbrid}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      });
      setMember(data.member);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    await fetchBookData(searchValue);
    searchParams.delete("barcode_nmbr");
    setSearchParams(searchParams);
  };

  const handleCheckIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/bibliohist/checkin", { barcode_nmbr: searchValue });
      setFlashMessage(data.message, "success");
      navigate("/circulation");
    } catch (error) {
      const err = error as AxiosError;
      const message = err.message || "Erro desconhecido";
      setFlashMessage(message, "error");
    }
  };

  useEffect(() => {
    if (urlBarcode) {
      fetchBookData(urlBarcode).then(() => {
        searchParams.delete("barcode_nmbr");
        setSearchParams(searchParams);
      });
    }
  }, []);

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
        {bookInfo && bookInfo.BiblioMedia && (
          <BookSection>
            <BookImage>
              <Image image={imageSrc} />
              <BookTitle>
                {bookInfo.title}
                {bookInfo.title_remainder && ` - ${bookInfo.title_remainder}`}
              </BookTitle>
              <Author>por {bookInfo.author}</Author>
              <InfoItems>
                <DateBook><FaUserClock />{member?.first_name} {member?.last_name}</DateBook>
                <DateBook><FingerprintIcon />{member?.barcode_nmbr}</DateBook>
              </InfoItems>
            </BookImage>
            <BookInfo>
              <ObservationContent onSubmit={handleCheckIn}>
                <Title>Devolver o livro</Title>
                <ObservationTitle>Deseja adicionar uma observação?</ObservationTitle>
                <ObservationText />
                <ButtonCheckin type="submit">Devolver</ButtonCheckin>
              </ObservationContent>
            </BookInfo>
          </BookSection>
        )}
      </ResultsContainer>
    </Container>
  );
};

export default SearchCheckinInput;

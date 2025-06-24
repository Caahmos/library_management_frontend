import Book from '../BookCard/Book';
import { useNavigate } from 'react-router-dom';
import { useHandleSearch } from '../../../hooks/useHandleSearch';

import {
  Container,
  Title,
  SwiperContainer,
  StyledSlide,
  Header,
  More
} from './styles';

import type { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface BooksSectionProps {
  collection: string;
  title: string
  biblioData: Biblio[]
}

const BooksSection: React.FC<BooksSectionProps> = ({ biblioData, title, collection }) => {
  const navigate = useNavigate();
  const { changeFilter } = useHandleSearch();

  const handleOnClick = (collection: string) => {
    changeFilter({collection: collection, date: 'desc', order: '', take: '100', viewStyle: 'block'});
    navigate('/catalog');
  };

  return (
    <Container>
      <Header>
              <Title>{title}</Title>
              <More onClick={() => {handleOnClick(collection)}}>VER MAIS</More>
            </Header>
      <SwiperContainer>
        <Swiper
        spaceBetween={10}
          slidesPerView="auto"
          onSlideChange={() => console.log('slide change')}
          onSwiper={() => console.log()}
        >
          {
            biblioData && biblioData.map((biblio) => (
              <StyledSlide key={biblio.bibid}>
                <Book
                  id={biblio.bibid}
                  title={biblio.title}
                  author={biblio.author}
                  img={biblio.BiblioMedia && biblio.BiblioMedia[0]?.imageUrl || 'semcapa.png'}
                  rank={biblio.BiblioMedia && biblio.BiblioMedia[0]?.rank || 0}
                />
              </StyledSlide>
            ))
          }
        </Swiper>
      </SwiperContainer>
    </Container>
  );
}

export default BooksSection;

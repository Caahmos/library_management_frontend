import BookCard from '../BookCard';
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

import { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
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
    changeFilter({collection: collection, date: 'desc', order: '', take: '100'});
    navigate('/catalog');
  };

  return (
    <Container>
      <Header>
              <Title>{title}</Title>
              <More onClick={() => {handleOnClick(collection)}}>Ver mais</More>
            </Header>
      <SwiperContainer>
        <Swiper
        spaceBetween={20}
          slidesPerView="auto"
          onSlideChange={() => console.log('slide change')}
          onSwiper={() => console.log()}
        >
          {
            biblioData && biblioData.map((biblio) => (
              <StyledSlide key={biblio.bibid}>
                <BookCard
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

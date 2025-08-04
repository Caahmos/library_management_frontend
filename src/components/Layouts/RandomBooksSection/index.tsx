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
} from './styles'

import type { RandomBiblio } from '../../../model/Biblio/Biblio/RandomSearchBiblioResponse';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface RandomBiblios {
  randomBiblios: RandomBiblio[]
}

const RandomBooksSection: React.FC<RandomBiblios> = ({ randomBiblios }) => {
  const navigate = useNavigate();
  const { changeFilter } = useHandleSearch();

  const handleOnClick = (collection: string) => {
    changeFilter({ collection: collection, date: 'desc', order: '', take: '100', viewStyle: 'block' });
    navigate('/catalog');
  };

  return (
    <>
      {
        randomBiblios && randomBiblios.map((value) => (
          <Container>
            <Header>
              <Title>{value.collection.description}</Title>
              <More onClick={() => { handleOnClick(value.collection.description) }}>VER MAIS</More>
            </Header>
            <SwiperContainer>
              <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                onSlideChange={() => console.log('slide change')}
                onSwiper={() => console.log()}
              >
                {
                  value.biblios && value.biblios.map((biblio) => (
                    <StyledSlide key={biblio.bibid}>
                      <Book
                        key={biblio.bibid}
                        id={biblio.bibid}
                        title={biblio.title}
                        author={biblio.author}
                        img={biblio.BiblioMedia && biblio.BiblioMedia[0]?.imageUrl || 'semcapa.png'}
                        rank={biblio.BiblioMedia && biblio.BiblioMedia[0]?.rank || 0}
                        category={biblio.collection?.description}
                        colors={biblio.collection?.colors}
                      />
                    </StyledSlide>
                  ))
                }
              </Swiper>
            </SwiperContainer>
          </Container>
        ))
      }
    </>
  );
}

export default RandomBooksSection;

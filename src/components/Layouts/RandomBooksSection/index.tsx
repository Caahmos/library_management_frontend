import BookCard from '../BookCard';
import {
  Container,
  Title,
  SwiperContainer,
  StyledSlide
} from './styles'
import { RandomBiblio } from '../../../model/Biblio/Biblio/RandomSearchBiblioResponse';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface RandomBiblios {
  randomBiblios: RandomBiblio[]
}

const RandomBooksSection: React.FC<RandomBiblios> = ({randomBiblios}) => {
  return (
    <Container>
      {
        randomBiblios && randomBiblios.map((value) => (
          <>
            <Title>{value.collection.description}</Title>
            <SwiperContainer>
              <Swiper
                spaceBetween={20}
                slidesPerView="auto"
                onSlideChange={() => console.log('slide change')}
                onSwiper={() => console.log()}
              >
                {
                  value.biblios && value.biblios.map((biblio) => (
                    <StyledSlide key={biblio.bibid}>
                      <BookCard
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
          </>
        ))
      }
    </Container>
  );
}

export default RandomBooksSection;

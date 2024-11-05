import BookCard from '../BookCard';
import {
  Container,
  Title,
  SwiperContainer,
  StyledSlide
} from './styles'
import { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface BooksSectionProps {
  biblioData: Biblio[]
}

const BooksSection: React.FC<BooksSectionProps> = ({ biblioData }) => {
  return (
    <Container>
      <Title>Novidades na biblioteca</Title>
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

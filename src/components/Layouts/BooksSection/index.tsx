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
  title: string
  biblioData: Biblio[]
}

const BooksSection: React.FC<BooksSectionProps> = ({ biblioData, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
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

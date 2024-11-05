import BookCard from '../BookCard';
import {
  Container,
  Title
} from './styles'
import { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';

interface BooksSectionProps {
  biblioData: Biblio[]
}

const BooksSection: React.FC<BooksSectionProps> = ({biblioData}) => {

  return (
    <Container>
      <Title>Novidades na biblioteca</Title>
      {
        biblioData && biblioData.map((biblio) => {
          return <BookCard title={biblio.title} author={biblio.author} img={biblio.BiblioMedia[0].imageUrl} rank={biblio.BiblioMedia[0].rank} />
        })
      }
    </Container>
  );
}

export default BooksSection;
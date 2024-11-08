import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.colors.white};
`;

export const BookSection = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  gap: 20px;
`;

export const BookImage = styled.div`
  width: 40%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 200px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const BookInfo = styled.div`
  width: 50%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;

  > img {
    width: 200px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  min-height: 280px;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.div`
  font-size: 1.5rem;
`;

export const Author = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`;

export const Rating = styled.div`
  font-size: 0.8rem;
`;

export const Description = styled.div`
  font-size: 0.9rem;
`;

export const DateBook = styled.div`
  margin-top: auto;

  > svg {
    color: ${(props) => props.theme.colors.success};
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.colors.secondary};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

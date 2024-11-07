import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  width: 40%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 40%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  width: 55%;
  height: 400px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  padding: 40px;
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 60px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const Title = styled.div`
  font-size: 1.7rem;
  color: ${(props) => props.theme.colors.white};
`;

export const Author = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
  `;

export const Rating = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.white};
  `;

export const Description = styled.div`
    width: 50%;
    font-size: 0.9rem;
    line-height: 1.6rem;
    color: ${(props) => props.theme.colors.white};
    `;

export const DateBook = styled.div`
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;
    gap: 12px;
    
    > svg {
      font-size: 1rem;
      color: ${(props) => props.theme.colors.success};
    }
`

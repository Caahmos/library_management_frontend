import styled from "styled-components";
import { Link } from "react-router-dom";

export const BannerWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 20px;

  .swiper-pagination-bullets {
    bottom: 10px !important;
  }

  .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
    transition: 0.3s;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.success};
    opacity: 1;
  }
`;

export const SlideContent = styled.div<{$img: string}>`
  display: flex;
  background-image: url(${props => props.$img});
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 500px;

  @media screen and (max-width: 800px){
    background-image: none;
  }
`;

export const TextSection = styled.div`
  height: 100%;
  padding: 60px;
  width: 50%;
  color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

export const Button = styled(Link)`
  margin-top: 30px;
  padding: 15px 20px;
  width: fit-content;
  border-radius: 7px;
  background-color: ${props => props.theme.colors.success};
  color: #fff;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s all ease;

  > svg{
    font-size: 1.1rem;
  }

  &:hover{
    background-color: ${props => props.theme.colors.success + '9a'};
  }
`
  ;
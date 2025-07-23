import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";
import styled from "styled-components";
import { IoBook } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PiMedal } from "react-icons/pi";

const BannerWrapper = styled.div`
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

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 60px;
`;

const TextSection = styled.div`
  height: 100%;
  width: 50%;
  color: white;
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

const Button = styled(Link)`
  margin-top: 30px;
  padding: 15px 20px;
  width: fit-content;
  border-radius: 7px;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
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

const BannerCarousel: React.FC = () => {
  return (
    <BannerWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
      >
        <SwiperSlide>
          <SlideContent>
            <TextSection>
              <h2>Sejam bem-vindos ao Lybup!</h2>
              <p>Este aplicativo foi desenvolvido para facilitar o acesso ao acervo da biblioteca, permitindo que você consulte livros, faça reservas e acompanhe seus empréstimos com praticidade. Ainda estamos trabalhando em novas funcionalidades, e qualquer sugestão ou feedback pode ser encaminhado diretamente ao bibliotecário.</p>
              <Button to='/catalog'><IoBook />Ver Catálogo</Button>
            </TextSection>
          </SlideContent>
        </SwiperSlide>

        <SwiperSlide>
          <SlideContent>
            <TextSection>
              <h2>Ranks dos Usuários</h2>
              <p>Os ranks foram criados como uma forma de reconhecer e incentivar a participação dos leitores na biblioteca. Conforme você realiza ações como empréstimos, devoluções em dia, reservas ou interações com o acervo, seu nível evolui. Cada rank representa seu envolvimento e dedicação à leitura. Fique atento: em breve, novos benefícios e conquistas estarão disponíveis para os usuários mais engajados!</p>
              <Button to='/member/rank'><PiMedal />Ver Ranks</Button>
            </TextSection>
          </SlideContent>
        </SwiperSlide>
      </Swiper>
    </BannerWrapper>
  );
};

export default BannerCarousel;

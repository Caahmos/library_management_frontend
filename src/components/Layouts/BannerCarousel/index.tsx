import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";
import { IoBook } from "react-icons/io5";
import { PiMedal } from "react-icons/pi";
import { BannerWrapper, Button, SlideContent, TextSection } from "./styles";
import goldbanner from '../../../assets/imgs/goldbanner.png';
import studentsbanner from '../../../assets/imgs/studentsbanner.png';

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
          <SlideContent $img={studentsbanner}>
            <TextSection>
              <h2>Sejam bem-vindos ao Lybup!</h2>
              <p>Este aplicativo foi desenvolvido para facilitar o acesso ao acervo da biblioteca, permitindo que você consulte livros, faça reservas e acompanhe seus empréstimos com praticidade. Ainda estamos trabalhando em novas funcionalidades, e qualquer sugestão ou feedback pode ser encaminhado diretamente ao bibliotecário.</p>
              <Button to='/catalog'><IoBook />Ver Catálogo</Button>
            </TextSection>
          </SlideContent>
        </SwiperSlide>

        <SwiperSlide>
          <SlideContent $img={goldbanner}>
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

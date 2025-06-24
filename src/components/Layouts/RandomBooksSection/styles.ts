import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const SwiperContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  cursor: grab;
  .swiper-container {
    width: 100%;
  }
`;

export const StyledSlide = styled(SwiperSlide as any)`
  width: auto;
  max-width: 300px;
  border-radius: 7px;
`;

export const Container = styled.main`
  width: 100%;
  min-height: 300px;
`;

export const Title = styled.h3`
  font-weight: normal;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.white};
`;

export const Header = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const More = styled.span`
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.success};
  border: 1px solid ${(props) => props.theme.colors.success};
  cursor: pointer;
  transition: 0.4s all ease;
  font-size: 0.8rem;
  font-weight: bold;
`;

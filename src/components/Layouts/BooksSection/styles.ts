import styled from 'styled-components'

import { SwiperSlide } from 'swiper/react';

export const SwiperContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .swiper-container {
    width: 100%;
  }
`;

export const StyledSlide = styled(SwiperSlide)`
    width: auto;
    max-width: 300px;
    min-height: 200px;
    border-radius: 7px;
`

export const Container = styled.main`
    width: 100%;
    min-height: 300px;
    
`

export const Title = styled.h3`
    margin-bottom: 10px;
    color: ${props => props.theme.colors.white}
`

export const Header = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
`;

export const More = styled.span`
  cursor: pointer;
  transition: 0.4s all ease;

  &:hover{
    color: ${(props) => props.theme.colors.success};
  }
`;

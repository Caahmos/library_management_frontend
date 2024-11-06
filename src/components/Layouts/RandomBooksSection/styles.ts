import styled from 'styled-components'

import { SwiperSlide } from 'swiper/react';

export const SwiperContainer = styled.div`
  width: 100%;
  .swiper-container {
    width: 100%;
  }
`;

export const StyledSlide = styled(SwiperSlide)`
    width: auto;
    max-width: 300px;
    min-height: 170px;
    border-radius: 7px;
`

export const Container = styled.main`
    width: 100%;
    min-height: 300px;
    padding: 20px;
`

export const Title = styled.h3`
    margin-bottom: 10px;
    color: ${props => props.theme.colors.white}
`
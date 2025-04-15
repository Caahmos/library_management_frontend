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
    color: ${props => props.theme.colors.white}
`

export const Header = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const More = styled.span`
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.white};
  cursor: pointer;
  transition: 0.4s all ease;
  
  &:hover{
    border: 1px solid ${(props) => props.theme.colors.success};
    color: ${(props) => props.theme.colors.success};
  }
`;

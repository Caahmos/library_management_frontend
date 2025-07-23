import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  min-width: 350px;
  width: 400px;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  box-shadow: 2px -1px 49px -1px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 2px -1px 49px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 2px -1px 49px -1px rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.colors.white};
  z-index: 5;
`;

export const Title = styled.p`
  font-size: 1.4em;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  border-radius: 7px;
  margin-top: 20px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: ease 0.2s all;

  &:hover {
    background-color: ${(props) => props.theme.colors.success + '8a'};
  }
`;

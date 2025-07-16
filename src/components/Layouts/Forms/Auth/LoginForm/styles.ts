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
  -webkit-box-shadow: 42px 35px 58px -36px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 42px 35px 58px -36px rgba(0, 0, 0, 0.9);
  box-shadow: 42px 35px 58px -36px rgba(0, 0, 0, 0.9);
`;

export const Title = styled.h2`
  font-size: 1.4em;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  border-radius: 12px;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }
`;

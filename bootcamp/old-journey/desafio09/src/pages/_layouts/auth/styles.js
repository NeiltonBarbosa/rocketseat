import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    input {
      margin: 0 0 10px;
      padding: 0 15px;
      height: 44px;

      border-radius: 4px;
      border: 0;

      font-size: 18px;

      background: rgba(0, 0, 0, 0.1);
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #f94d6a;
      font-weight: bold;
      margin: 0 0 10px;
      align-self: flex-start;
    }

    button {
      margin: 5px 0 0;
      height: 44px;

      border-radius: 4px;
      border: 0;

      font-size: 18px;
      font-weight: bold;

      color: #fff;
      background: #f94d6a;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      margin-top: 15px;

      font-size: 16px;
      font-weight: bold;

      color: #fff;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

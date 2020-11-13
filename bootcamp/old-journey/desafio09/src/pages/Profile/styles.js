import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;

    input {
      padding: 0 15px;
      height: 42px;
      margin-bottom: 10px;

      border: 0;
      border-radius: 4px;

      font-size: 16px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;

      &::placeholder {
        color: #999;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    div {
      display: flex;
      justify-content: flex-end;
      button {
        display: flex;
        align-items: center;
        padding: 0 15px;
        height: 42px;

        border: 0;
        border-radius: 4px;

        background: #d44059;
        color: #fff;
        font-weight: bold;
        font-size: 16px;

        svg {
          margin-right: 10px;
        }

        &:hover {
          background: ${darken(0.08, '#d44059')};
        }
      }
    }
  }
`;

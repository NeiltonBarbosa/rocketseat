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

    textarea {
      padding: 15px 15px;
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

export const ImageInput = styled.label`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);

  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    z-index: 999;

    &:hover {
      opacity: 0.3;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 20px;
    font-weight: bold;
    color: #999;
    position: absolute;
    top: 200;
  }

  input {
    display: none;
  }
`;

export const FileInput = styled.label`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);

  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    z-index: 999;

    &:hover {
      opacity: 0.3;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 20px;
    font-weight: bold;
    color: #999;
    position: absolute;
    top: 200;
  }

  input {
    display: none;
  }
`;

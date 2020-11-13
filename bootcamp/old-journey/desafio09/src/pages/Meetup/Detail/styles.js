import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto;
  height: 100%;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h1 {
      color: #fff;
      font-size: 32px;
    }

    div {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        margin-right: 20px;
        height: 42px;
        color: #fff;
        background: #4dbaf9;
        padding: 0 15px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 16px;

        &:hover {
          background: ${darken(0.08, '#4dbaf9')};
        }

        svg {
          margin-right: 15px;
        }
      }

      button {
        display: flex;
        align-items: center;
        height: 42px;
        padding: 0 15px;

        font-size: 16px;
        font-weight: bold;

        border: none;
        border-radius: 4px;

        color: #fff;
        background: #d44059;

        &:hover {
          background: ${darken(0.08, '#d44059')};
        }

        svg {
          margin-right: 15px;
        }
      }
    }
  }
`;

export const Meetup = styled.div`
  img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    max-width: 900px;
    margin-bottom: 20px;
  }

  p {
    text-align: justify;
    color: #fff;
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 20px;
  }

  div {
    flex: 1;
    display: flex;
    justify-content: space-between;

    span {
      color: #999;
      font-size: 16px;
    }
  }
`;

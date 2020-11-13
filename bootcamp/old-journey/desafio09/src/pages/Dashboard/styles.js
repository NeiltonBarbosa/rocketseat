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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h1 {
      font-size: 32px;
      color: #fff;
    }

    button {
      display: flex;
      align-items: center;
      height: 42px;
      padding: 0 15px;

      color: #fff;
      background: #f94d6a;

      border: 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
      }

      svg {
        margin-right: 15px;
      }
    }
  }

  span {
    color: #999;
    font-size: 16px;
  }
`;

export const Meetup = styled.li`
  margin-bottom: 10px;

  a {
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    padding: 0 60px 0 20px;

    background: rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    div {
      display: flex;
      align-items: center;

      strong {
        color: #fff;
        font-size: 18px;
        margin-left: 10px;
      }
    }

    span {
      color: #999;
      font-size: 16px;
    }
  }
`;

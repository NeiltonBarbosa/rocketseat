import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  aside {
    display: flex;
    align-items: center;

    button {
      margin-left: 20px;
      padding: 0px 20px;
      height: 42px;
      border-radius: 4px;
      color: #fff;
      border: 0;
      font-weight: bold;
      background: #d44059;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }

  a {
    font-size: 14px;
    color: #999;
  }
`;

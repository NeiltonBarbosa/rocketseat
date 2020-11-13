import styled from 'styled-components';

export const Container = styled.label`
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

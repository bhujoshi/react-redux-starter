import styled from 'styled-components';

export const UserAvatar = styled.div`
  margin: 0;
  cursor: pointer;
  display: inline-block;
  h4 {
    font-size: 16px;
    line-height: 64px;
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.8em;
    background: rgba(207, 230, 255, 0.23);
    font-size: 22px;
    line-height: 22px;
  }
`;

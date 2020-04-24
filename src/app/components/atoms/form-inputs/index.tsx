import styled from 'styled-components';

export const Form = styled.form`
  margin: 1.5em 0;
`;

export const InputContainer = styled.div`
  margin-top: 1.2em;
  text-align: right;

  & select {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    border-radius: 4px;
    height: 44px;
    padding: 0 1em;
    font-size: 1em;
    background-color: #fff;
    -webkit-appearance: none;
  }
`;

import styled from 'styled-components'

export const Modal = styled.div`
    opacity: 1;
    background-color: #fff;
    width: 600px;
    max-height: 100%;
    min-height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    z-index: 999;
    pointer-events: auto;
    cursor: auto;
    visibility: visible;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6);
    padding: 2em;

   span{
    text-align: right;
    cursor: pointer;
    display: block;
    }

    h2{
      font-size: 1.5em;
      font-weight: normal;
      text-align: center;
    }
`

export const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-in;

`
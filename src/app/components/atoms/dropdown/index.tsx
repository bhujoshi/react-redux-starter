import styled from 'styled-components'

export const Dropdown = styled.div`

  position: relative;
  display: inline-block;
  transition: all .3s ease-in-out;

  ul{
    opacity: 0;
    visibility: hidden;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10;
    right: 0;
    min-width: 120px;
    transition: all .3s ease-in-out;
    transform: translateY(15px);

    li{
      width: 100%;
      text-align: right;
      line-height: 50px;
      
      a{
        display: block;
        text-decoration: none;
        color: var(--text-color);
        padding: 0 2em;

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
  
  &:hover ul{
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

`



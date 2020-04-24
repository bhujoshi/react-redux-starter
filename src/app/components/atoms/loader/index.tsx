import React from 'react'
import styled from 'styled-components'

export const Loading = ()=> <Loader>
  <div></div>
	</Loader>

export const Loader = styled.div`

position: fixed;
width: 100%;
height: 100%;
z-index: 99;
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;

&:before{
  content: "";
  position: fixed;
  background-color: rgba(0, 0, 0, 0.30);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  z-index: 100;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
}

div{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #d7cfcd;
  border-left-color: var(--brand-color);
  display: inline-block;
  margin: 0 auto;
  animation: round-spin .6s linear infinite;
  z-index: 100;

  &:@keyframes round-spin{
    0% {
      transform: rotate(0deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }
}

`

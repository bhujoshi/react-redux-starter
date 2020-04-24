import styled from 'styled-components'

export const Button = styled.button`
    background: #1D7DEA;
    box-shadow: 0px 0px 6px rgba(196,196,196,0.224892);
    border-radius: 4px;
    color: #fff;
    max-width: 150px;
    width: 100%;
    line-height: 40px;
    height: 40px;
    font-size: 1em;
    border: none;
    cursor: pointer;

    &[disabled]{
        cursor: not-allowed;
        pointer-events: none;
        user-select: none;
        opacity: .5;
    }
`
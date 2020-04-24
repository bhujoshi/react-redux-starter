import styled from 'styled-components'

export const Grid = styled.div`
    margin: auto;
    outline: 0;
    position: relative;
    justify-content: center;
`

export const GridAuto = styled.div`
    display: grid;
    grid-template-columns: auto;
`

export const GridTwo = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`

export const GridThree = styled.div`
    display: grid;
    grid-template-columns: 33.333% 33.333% 33.333%;
`

export const GridFour = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
`
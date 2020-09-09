import styled from 'styled-components/macro'

export const Card = styled.div`
   background-color: white;
   border-radius: 4px;
   box-shadow: 0 2px 16px -6px rgba(0, 0, 0, 0.54);
   padding: 16px;
`

export const Vertical = styled.div`
   display: flex;
   flex-direction: column;
`

export const Horizontal = styled.div`
   display: flex;
   flex-direction: row;
`

export const SpaceBetweenRow = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`

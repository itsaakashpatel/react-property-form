import styled, { keyframes } from 'styled-components'

const fadeAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const DragBoxWrapper = styled.div`
  position: relative;
  height: 100px;
  border-width: 2px;
  border-color: rgb(102, 102, 102);
  border-style: dashed;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation-name: ${fadeAnimation};
  animation-duration: 5s;
`

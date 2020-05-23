import styled from 'styled-components'

import { Card } from 'react-bootstrap';
import { COLORS} from 'Styles/Constants';

export const CardWrapper = styled.div`
  width : 100%;
  background-color : white;

  display: flex;
  align-items: flex-start;
  padding : 24px;
  
`

export const StepCardWrapper  = styled.div`
    position : relative;
    flex  : 1;
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    span {
      width  :100%;
    }

    .label {
      text-align: center;
      margin-top  :16px;
    }
`

export const StepIcon = styled.div`
  background-color : ${props => props.active ? COLORS.PRIMARY : 'grey'};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  text-align: center;
  color: white;
  padding: 6px;
  z-index : 999;
`

export const StepConnecter = styled.div`
    position : absolute;
    height  : 2px;
    background-color : grey;
    top: 17px;
    left: calc(-50% + 25px);
    right: calc(50% + 25px);
`

export const StepContentWrapper = styled.div`
  background-color : white;
  margin-top: 20px;
  width : 100%;
  height : 100vh;

  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;

  form {
    width : 100%;
    padding:  35px;
  }

  .dropzone {
    width : 100%;
    padding:  35px;
    height : 170px;
  }

  .all-files {
    height : calc(100% - 50px - 170px);
    display : flex;
    flex-wrap : wrap;
    padding : 20px;
  }

  .actions {
    height : 50px;
  }

  .img-preview {
    margin: 10px;
    height: max-content;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image-control {
      margin-top: 10px;
      text-align: center;

      .name {
        margin-left : 5px;
      }
    }
  }
`

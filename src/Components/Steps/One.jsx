import React from 'react'

import { Button} from 'react-bootstrap';
import { StepOneWrapper } from './Steps.style'

export default function One(props) {
  return (
    <div>
      <Button variant="primary" onClick={props.handleNext}>Add From Scratch</Button>{' '}
      <Button variant="secondary">Upload CSV</Button>{' '}
    </div>
  )
}

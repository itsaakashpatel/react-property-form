import React from 'react'
import { DragBoxWrapper } from './Dragbox.style'

function DragBox(props) {
  return (
    <DragBoxWrapper {...props.root}>
        <input {...props.input} />
        <h3>Upload or Drag Your Files Here</h3>
        {props.reject && <div style={{ color : 'red'}}>{props.message}</div>}
    </DragBoxWrapper>
  )
}

export default React.memo(DragBox)
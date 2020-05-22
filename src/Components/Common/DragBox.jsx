import React from 'react'
import { DragBoxWrapper } from './Dragbox.style'

export default function DragBox(props) {
  return (
    <DragBoxWrapper {...props.root}>
        <input {...props.input} />
        <h3>Upload Your Files Here</h3>
        {props.isDragReject && "File type not accepted, sorry!"}
    </DragBoxWrapper>
  )
}

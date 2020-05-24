import React from 'react'
import PropTypes from 'prop-types';

//STYLE
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

DragBox.propTypes = {
  root: PropTypes.object,
  active: PropTypes.func,
  reject : PropTypes.bool,
  message : PropTypes.string
}

export default React.memo(DragBox)
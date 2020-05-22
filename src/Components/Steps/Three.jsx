import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

import DragBox from 'Components/Common/DragBox'

export default function Three(props) {

  const [files, setFiles] = useState([])

  const onDrop = (newFiles) => {
    let newArray = newFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))
    
    setFiles(files.concat(newArray))
  }

  const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
    border: '2px solid #545b62',
    borderRadius: '5px'
  };

  const FilePreview = (file) => {
    console.log("FilePreview -> file", file)
    return(
      <div className="img-preview" key={uuidv4()}>
        <img
          alt="Preview"
          src={file.preview}
          style={previewStyle}
        />
      </div>
    )
  }

  return (
    <>
    <div className="dropzone">
      <Dropzone accept="image/*" onDrop={onDrop}>
          {({getRootProps, getInputProps, isDragReject}) => (
            <DragBox 
              root={getRootProps()}
              input={getInputProps()}
              reject={isDragReject}
            />
          )}
      </Dropzone> 
    </div>
    <div className="all-files">
      {
        files.length > 0 && 
        files.map(file => FilePreview(file))
      }
    </div>
    <div className="actions">
      <Button variant="secondary" onClick={props.handleBack}>Back</Button>{' '}
      <Button variant="primary">Submit</Button>{' '}
    </div>
    </>
  )
}

import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { Button, Alert, Toast } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

import DragBox from 'Components/Common/DragBox'

export default function Three(props) {

  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([])

  const onDrop = (newFiles) => {
    //REMOVE DUPLICATES
    let filteredFiles = newFiles.filter(file => files.findIndex(item => item.name === file.name) === -1)
    let promiseArray = []
    let mappedArray = filteredFiles.map(file => {
      let updatedFileObj =  Object.assign(file, {
        preview: URL.createObjectURL(file),
        key  : uuidv4(),
        checked : false
      })
      promiseArray.push(getBase64(file))
      return updatedFileObj
    })

    Promise.allSettled(promiseArray).then(result => {
      let errorArray = []
      let finalArray = []
      result.forEach(element => {
        if(element.status === "fulfilled") {
          let findElement = mappedArray.splice(mappedArray.findIndex(item => item.key === element.value.key), 1)
          findElement[0].encoded = element.value.encoded
          finalArray.push(findElement[0])
        } else {
          errorArray.push(element)
        }
          
      });
      setErrors(errorArray) //SAVING FILE ERRORS AT ONE PLACE...

      //MAX FILES ARE ALLOWED
      if(files.concat(finalArray).length <= process.env.REACT_APP_MAX_FILE_ALLOWED)
        setFiles(files.concat(finalArray))
      else
        alert('You have reached max file limit!, upto 4 files are allowed')
    }).catch(error => {
      //DO SOMETHING WHEN ERROR COMES
      console.log("onDrop -> CATCH -> error", error)
    })
  } 

  const getBase64 = (file) => {
    
    return new Promise((resolve, reject) => {
      let base = {
        name : file.name,
        key  : file.key
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve({
          ...base,
          encoded : reader.result
        })
      }
      reader.onerror = function (error) {
        reject(`File upload error! : ${error}`)
      };
      
    })
    
  }

  const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
    border: '2px solid #545b62',
    borderRadius: '5px'
  };

  const setAsPreviewImage = (key) => {
    let mappedFiles = files.map(file => {
      if(file.key === key)
        file.checked = true
      else
        file.checked = false
      return file
    })
    setFiles(mappedFiles)
  }

  const FilePreview = (file) => {
    console.log("FilePreview -> file encoded", file)
    return(
      <div className="img-preview" key={file.key}>
        <img
          alt="Preview"
          src={file.encoded}
          style={previewStyle}
        />
        <div className="image-control">
          <input type="checkbox" checked={file.checked} onChange={() => setAsPreviewImage(file.key)}/>
          <strong className="name">{file.name}</strong>
        </div>
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
                message={'File type not accepted, sorry!'}
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

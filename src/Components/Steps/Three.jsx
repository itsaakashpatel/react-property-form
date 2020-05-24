import React, {useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

//LOCAL COMPONENTS
import DragBox from 'Components/Common/DragBox'
import FilePreview from './FilePreview'

function Three(props) {

  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([]) //SAVE ERRORS WHILE FILE UPLOADING...

  useEffect(() => {
    setFiles(props.images)
  }, [props])

  useEffect(() => {
    //DO SOMETHING WHEN FILE ERRORS COME...
    console.log('FILE ERRORS', errors)
  }, [errors])

  const onDrop = (newFiles) => {

    //REMOVE DUPLICATES, ONLY NEW IMAGES
    let filteredFiles = newFiles.filter(file => files.findIndex(item => item.name === file.name) === -1)

    //If NO NEW IMAGES
    if(!filteredFiles.length)
      return false
    
    //MAX IMAGES ARE ALLOWED ONLY
    if(files.concat(filteredFiles).length > process.env.REACT_APP_MAX_FILE_ALLOWED) {
      alert('You have reached max file limit!, upto 4 files are allowed')
      return false
    }

    let promiseArray = []
    let mappedArray = filteredFiles.map(file => {
      let updatedFileObj =  Object.assign(file, {
        preview: URL.createObjectURL(file),
        key  : uuidv4(),
        isFeaturedImage : false
      })
      //GET BASE64 STRING FOR IMAGE
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
      setFiles(files.concat(finalArray))

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


  const setAsPreviewImage = (key) => {
    let mappedFiles = files.map(file => {
      if(file.key === key)
        file.isFeaturedImage = true
      else
        file.isFeaturedImage = false
      return file
    })
    setFiles(mappedFiles)
  }

  return (
    <>
      <div className="dropzone">
        <Dropzone accept="image/*" onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragReject }) => (
            <DragBox
              root={getRootProps()}
              input={getInputProps()}
              reject={isDragReject}
              message={"File type not accepted, sorry!"}
            />
          )}
        </Dropzone>
      </div>
      <div className="all-files">
          {files.length > 0 &&
            files.map((file) => (
              <FilePreview
                key={file.key}
                file={file}
                setAsPreviewImage={setAsPreviewImage}
              />
          ))}
      </div>
      <div className="actions">
        <Button variant="secondary" onClick={props.handleBack}>
          Back
        </Button>{" "}
        <Button variant="primary" onClick={() => props.submitForm(files)}>
          Submit
        </Button>{" "}
      </div>
    </>
  );
}

Three.propTypes = {
  handleBack: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  images : PropTypes.array,
}

export default Three
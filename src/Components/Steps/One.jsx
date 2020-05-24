import React, {useState, useEffect, useRef} from 'react'
import Dropzone from 'react-dropzone'
import csv from 'csv';
import PropTypes from 'prop-types';
import { Button} from 'react-bootstrap';

//LOCAL COMPONENTS
import DragBox from 'Components/Common/DragBox'


function One(props) {
  const [fileData, setFileData] = useState({
    address: "",
    bedRoom: "",
    bathRoom: "",
    description: ""
  })
  const [uploadCSV, setUploadCSV] = useState(false)
  const initValues = useRef(fileData)

  //ENABLE CSV UPLOADING...
  const handleUploadCSV = () => setUploadCSV(true)

  //HANDLE WHAT TO DO WHEN FILE GETS UPLOADED...
  const onDrop = (newFile) => {
    console.log("onDrop -> newFile", newFile)

    try {   
      const reader = new FileReader();
      let file = newFile[0] //ONLY ONE FILE ALLOWED 
  
      reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
          if(err) {
            throw err
          }

          //NO EMPTY CSV
          if(data && data.length === 1 && data[0].length === 1 && data[0][0] === "")
            alert('Empty file is not allowed')

          //ONLY FIRST ROW DATA SHOULD BE PROCESSED FURTHER...
          if(data && data.length > 1) {
            alert('Multiple rows are not allowed!')
          }

          setFileData({
            address : data[0][0],
            bedRoom : data[0][1],
            bathRoom : data[0][2],
            description : data[0][3]
          })
        });
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      //CATCH ERROR AND DO SOMETHING...
      console.log('CATCH BLOCK', error)
    }
  }

  useEffect(() => {
    if(initValues.current !== fileData)
      props.changeValues(fileData)
  }, [fileData])

  return (
    <>
    <div>
      <Button variant="primary" onClick={props.addDataFromScratch}>Add From Scratch</Button>{' '}
      <Button variant="secondary" onClick={handleUploadCSV}>Upload CSV</Button>{' '}
    </div>
    {/* CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows.  */}
    {
      uploadCSV && <div className="dropzone">
        <Dropzone  onDrop={onDrop} accept='application/vnd.ms-excel,text/*, ' multiple={false}>
            {({getRootProps, getInputProps, isDragReject}) => (
              <DragBox 
                root={getRootProps()}
                input={getInputProps()}
                reject={isDragReject}
                message={'Only CSV file and one file at a time!'}
              />
            )}
        </Dropzone> 
      </div>
    }
    </>
  )
}

One.propTypes = {
  addDataFromScratch: PropTypes.func,
  changeValues: PropTypes.func,
}

export default One

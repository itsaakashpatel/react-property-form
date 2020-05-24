import React from 'react'
import PropTypes from 'prop-types';

function FilePreview(props) {
  //STYLE
  const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
    border: '2px solid #545b62',
    borderRadius: '5px'
  };

  return(
    <div className="img-preview" key={props.file.key}>
      <img
        alt="Preview"
        src={props.file.encoded}
        style={previewStyle}
      />
      <div className="image-control">
        <input type="checkbox" checked={props.file.isFeaturedImage} onChange={() => props.setAsPreviewImage(props.file.key)}/>
        <strong className="name">{props.file.name}</strong>
      </div>
    </div>
  )
}

FilePreview.propTypes = {
  file: PropTypes.object,
  setAsPreviewImage : PropTypes.func,
}

export default React.memo(FilePreview)
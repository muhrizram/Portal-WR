import React, { useState } from 'react'
import { Grid } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import '../../App.css'
const UploaderFile = () => {
  const [status, setStatus] = useState('Loading')

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { 
    console.log(status, meta, file)
    if (status === 'uploading') {
      setStatus('Loading')
    } else if (status === 'done') {
      setStatus('Complete')
    }
    let elementCard = document.getElementById('card-uploader-custom')
    if (elementCard) {
      elementCard.classList.remove('dragoverActive')
    }
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const handleDragEnter = () => {
    let elementCard = document.getElementById('card-uploader-custom')
    elementCard.classList.add('dragoverActive')
  }

  const handleDragLeave = () => {
    let elementCard = document.getElementById('card-uploader-custom')
    elementCard.classList.remove('dragoverActive')
  }

  const convertSize = (totalsize) => {
    let text = ''
    if (totalsize !== NaN) {
      const totalSizeKB = totalsize / 100
      const totalSizeMB = totalsize / 1000
      const isMB = totalSizeKB > 1
      text = `${isMB ? parseFloat(totalSizeMB).toFixed(2) : parseFloat(totalSizeKB).toFixed(2)} ${ isMB ? ' KB' : ' MB' } • `
    }
    return text
  }


  const renderDom = (props) => {
    console.log('props: ', props)
    return (
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <div 
            {...props.dropzoneProps} 
            onDragEnter={() => handleDragEnter()}
            onDragLeave={() => handleDragLeave()}
            // onDrop={(e) => handleDrop(e)}
            id='card-uploader-custom'
            className='uploader-file-card dzu-dropzone'
          >
            <Grid container rowSpacing={1}>
              <Grid item xs={12} textAlign='center'>
                <UploadFileIcon className='icon-uploader' />
              </Grid>
              <Grid item xs={12} textAlign='center'>
                <span className='uploader-text-underline'>Click to upload</span><span className='uploader-text'> or drag and drop</span>
              </Grid>
              <Grid item xs={12} textAlign='center'>
                <span className='uploader-text-bottom'>PNG or JPG (max. 3MB)</span>
              </Grid>
              <Grid item xs={12}>
                {props.input}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          {props.files.length > 0 && (
            <div className='bottom-card-uploader'>
              <Grid container>
                <Grid item xs={12}>
                  <span className='text-files-name'>{props.files[0].file.name}</span>
                </Grid>
                <Grid item xs={12}>
                  <span className='text-files-sizes'>{convertSize(props.files[0].file.size)} {status}</span>
                </Grid>
                <Grid item xs={12}>
                  {props.previews.length > 0 && (
                    props.previews[0]
                  )}
                </Grid>
              </Grid>
              {/* <Grid container>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid> */}
            </div>
          )}
        </Grid>
      </Grid>
    )
  } 

  const renderPreview = (props) => {
    console.log('props preview: ', props)
    return {...props}
  }
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      multiple={false}
      maxSizeBytes={3145728}
      accept="image/*"
      LayoutComponent={props => renderDom(props)}
    />
  )
}

export default UploaderFile
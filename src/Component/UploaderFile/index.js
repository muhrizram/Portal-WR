import React, { useState } from "react";
import { Grid } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "../../App.css";

const UploaderFile = ({ onCompleteUpload, overtime }) => {
  const [status, setStatus] = useState("Loading");

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    const token = localStorage.getItem("token");
    return {
      url: "https://portalwr-dev-api.cloudias79.com/minio/uploadFile?path=absence",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (status === "uploading") {
      setStatus("Loading");
    } else if (status === "done") {
      const json = JSON.parse(xhr.response);
      const text = `minio/view?file=${json.data.attributes.filePath}`;
      setStatus("Complete");
      onCompleteUpload(text);
    } else if (status === "removed") {
      setStatus("");
      onCompleteUpload("");
    }
    let elementCard = document.getElementById("card-uploader-custom");
    if (elementCard) {
      elementCard.classList.remove("dragoverActive");
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  const handleDragEnter = () => {
    let elementCard = document.getElementById("card-uploader-custom");
    elementCard.classList.add("dragoverActive");
  };

  const handleDragLeave = () => {
    let elementCard = document.getElementById("card-uploader-custom");
    elementCard.classList.remove("dragoverActive");
  };

  const convertSize = (totalsize) => {
    let text = "";
    if (totalsize !== NaN) {
      const totalSizeKB = totalsize / 100;
      const totalSizeMB = totalsize / 1000;
      const isMB = totalSizeKB > 1;
      text = `${
        isMB
          ? parseFloat(totalSizeMB).toFixed(2)
          : parseFloat(totalSizeKB).toFixed(2)
      } ${isMB ? " KB" : " MB"} • `;
    }
    return text;
  };

  const renderDom = (props) => {
    return (
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <div
            {...props.dropzoneProps}
            onDragEnter={() => handleDragEnter()}
            onDragLeave={() => handleDragLeave()}
            id="card-uploader-custom"
            className="uploader-file-card dzu-dropzone"
          >
            <Grid container rowSpacing={1}>
              {overtime && (
                <Grid item xs={12} textAlign="center">
                  <span className="uploader-text">
                    Approval Document <span style={{ color: "red" }}>*</span>
                  </span>
                </Grid>
              )}
              <Grid item xs={12} textAlign="center">
                <UploadFileIcon className="icon-uploader" />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <span className="uploader-text-underline">Click to upload</span>
                <span className="uploader-text"> or drag and drop</span>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <span className="uploader-text-bottom">
                  PNG or JPG (max. 3MB)
                </span>
              </Grid>
              <Grid item xs={12}>
                {props.input}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          {props.files.length > 0 && (
            <div className="bottom-card-uploader">
              <Grid container>
                <Grid item xs={12}>
                  <span className="text-files-name">
                    {props.files[0].file.name}
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span className="text-files-sizes">
                    {convertSize(props.files[0].file.size)} {status}
                  </span>
                </Grid>
                <Grid item xs={12}>
                  {props.previews.length > 0 && props.previews[0]}
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    );
  };
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxSizeBytes={3145728}
      accept={overtime ? "image/*,application/pdf" : "image/*"}
      LayoutComponent={(props) => renderDom(props)}
    />
  );
};

export default UploaderFile;

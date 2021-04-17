import React, { useState, Fragment } from "react";
import ProgressBar from "./ProgressBar";

import M from "materialize-css/dist/js/materialize.min.js";

const UploadForm = () => {
  const [state, setState] = useState({
    file: null
  });

  const { file } = state;

  let validTypes = ["image/jpeg", "image/png"];

  const onChange = e => {
    const selectedFile = e.target.files[0];
    if (validTypes.includes(selectedFile && selectedFile.type)) {
      setState({ ...state, file: selectedFile });
    } else {
      setState({
        ...state,
        file: null
      });
      M.toast({
        html: "Please select image of format (jpeg,png) only.",
        classes: "rounded"
      });
    }
  };

  return (
    <Fragment>
      <form action="#">
        <div className="file-field input-field">
          <div className="btn" style={{ backgroundColor: "#e61c5d" }}>
            <span>Choose An Image</span>
            <input type="file" onChange={onChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </form>
      {file && <ProgressBar file={file} setFile={setState} />}
    </Fragment>
  );
};

export default UploadForm;

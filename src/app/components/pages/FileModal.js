import React, { Fragment, useEffect } from "react";

import UploadForm from "./UploadForm";

import M from "materialize-css/dist/js/materialize.min.js";

const FileUpload = () => {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  });

  return (
    <Fragment>
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-large waves-effect waves-light
          modal-trigger
      "
          href="#fileModal"
          style={{ backgroundColor: "#e61c5d" }}
        >
          <i className="material-icons">add</i>
        </a>
      </div>
      <div id="fileModal" className="modal bottom-sheet open">
        <div className="modal-content">
          <h4 className="flow-text">Select an image</h4>
          <p className="helper-text">(jpeg, png only)</p>
          <UploadForm />
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-light btn
          deep-purple accent-2"
          >
            Close
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default FileUpload;

import React, { useEffect } from "react";

import M from "materialize-css/dist/js/materialize.min.js";

const ImageModal = ({ selectedImg }) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  });

  return (
    <div id="viewImage" className="modal">
      <div className="modal-content">
        <img src={selectedImg} alt="" className="responsive-img" />
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect btn "
          style={{ backgroundColor: "#e61c5d" }}
        >
          Close
        </a>
      </div>
    </div>
  );
};

export default ImageModal;

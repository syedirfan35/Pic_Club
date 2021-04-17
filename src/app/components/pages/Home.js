import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import FileModal from "./FileModal";
import ImagesGrid from "./ImagesGrid";
import ImageModal from "./ImageModal";

const Home = ({ isAuthenticated }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <FileModal />
      <ImagesGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <ImageModal selectedImg={selectedImg} />}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Home);

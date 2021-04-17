import React, { useEffect } from "react";
import { connect } from "react-redux";

import useStorage from "../../hooks/useStorage";

const ProgressBar = ({ file, setFile, userDetails }) => {
  const { url } = useStorage(file, userDetails);

  useEffect(() => {
    if (url) {
      setFile({ file: null });
    }
  }, [url, setFile]);

  return (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  );
};

const mapStateToProps = state => ({
  userDetails: state.userData.currentUser
});

export default connect(
  mapStateToProps,
  null
)(ProgressBar);

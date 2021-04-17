import React from "react";
import { connect } from "react-redux";

import ImageComponent from "./ImageComponent";

// import useDatabase from "../../hooks/useDatabase";
import useFirestore from "../../hooks/useFirestore";

const ImagesGrid = ({ userDetails, setSelectedImg }) => {
  const { docs } = useFirestore("images", userDetails);

  // let imageData = [];
  // docs.map(data => {
  //   for (const property in data) {
  //     imageData.push(data[property]);
  //   }
  // });

  return (
    <div>
      <div className="container" id="img-grid">
        {docs.length < 1 && (
          <h4 className="flow-text">
            Please Select the below add button to upload an image.
          </h4>
        )}
        {docs &&
          docs.map(doc => (
            <ImageComponent
              doc={doc}
              key={doc.createdAt}
              setSelectedImg={setSelectedImg}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userDetails: state.userData.currentUser
});

export default connect(
  mapStateToProps,
  null
)(ImagesGrid);

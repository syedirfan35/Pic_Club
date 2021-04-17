import React, { Fragment } from "react";
import { connect } from "react-redux";

import { motion } from "framer-motion";
import moment from "moment";

import M from "materialize-css/dist/js/materialize.min.js";

import firebase from "../../../firebase/config";

const ImageComponent = ({ doc, userDetails, setSelectedImg }) => {
  const onDelete = (file, id) => {
    //storage reference
    const projectStorage = firebase.storage();
    const storageRef = projectStorage.ref();

    const imageRef = storageRef.child(`images/${userDetails.uid}/${file}`);
    imageRef
      .delete()
      .then(() => {
        M.toast({html:'Deleted Successfully!',classes: 'rounded'})
      })
      .catch(err => {
        console.error(err);
      });
    //delete from realtime database
    // database reference
    const projectFirestore = firebase.firestore();
    projectFirestore
      .collection("allImages")
      .doc(userDetails.uid)
      .collection("images")
      .doc(id)
      .delete()
      .then(() => {})
      .catch(err => console.error(err));
  };

  const setImage = img => {
    setSelectedImg(img);
  };

  return (
    <Fragment>
      <motion.div className="card hoverable" layout>
        <div className="card-image">
          <motion.img
            src={doc.url}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <button
            className="btn-floating halfway-fab waves-effect waves-light"
            style={{ backgroundColor: "#e61c5d" }}
            onClick={() => onDelete(doc.fileName, doc.id)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
        <div className="card-content">
          <p>Added: {moment(doc.createdAt).fromNow()}</p>
        </div>

        <div className="card-action">
          <button
            className="btn modal-trigger"
            onClick={() => setImage(doc.url)}
            data-target="viewImage"
            style={{ backgroundColor: "#6930c3" }}
          >
            View
          </button>
        </div>
      </motion.div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userDetails: state.userData.currentUser
});

export default connect(
  mapStateToProps,
  null
)(ImageComponent);

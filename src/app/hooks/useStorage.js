import { useState, useEffect } from "react";
import firebase from "../../firebase/config";

const useStorage = (file, userDetails) => {
  const [state, setState] = useState({
    url: "",
    error: []
  });
  const { url, error } = state;

  const projectStorage = firebase.storage();
  const storageRef = projectStorage.ref();
  const imageRef = storageRef.child(`images/${userDetails.uid}/${file.name}`);

  // const timestamp = firebase.database.ServerValue.TIMESTAMP;
  // const projectDatabase = firebase.database();
  // const databaseRef = projectDatabase
  //   .ref("images")
  //   .child(userDetails.uid)
  //   .push();
  const projectFirestore = firebase.firestore();
  const collectionRef = projectFirestore
    .collection(`allImages`)
    .doc(userDetails.uid)
    .collection("images");

  useEffect(() => {
    imageRef.put(file).on(
      "state_changed",
      snap => {},
      err => {
        setState({ ...state, error: error.concat(err) });
      },
      async () => {
        const url = await imageRef.getDownloadURL();
        // databaseRef.set({
        //   fileName: file.name,
        //   url: url,
        //   email: userDetails.email,
        //   createdAt: timestamp
        // });
        // const createdAt = timestamp();
        collectionRef.add({
          fileName: file.name,
          email: userDetails.email,
          url,
          createdAt: new Date().toISOString()
        });
        setState({ ...state, url });
      }
    );
    //eslint-disable-next-line
  }, [file]);
  return { error, url };
};

export default useStorage;

import { useState, useEffect } from "react";

import firebase from "../../firebase/config";

const useDatabase = userDetails => {
  const [state, setState] = useState({
    docs: ""
  });
  const { docs } = state;

  useEffect(() => {
    const projectDatabase = firebase.database();
    const databaseRef = projectDatabase.ref("images").child(userDetails.uid);

    let documents = [];

    databaseRef.on(
      "child_added",
      snap => {
        documents.push(snap.val());
        // setDocs(documents);
        setState({ docs: documents });
      },
      err => {
        console.error(err);
      }
    );

    databaseRef.on(
      "child_removed",
      snap => {
        const toDeleteFile = snap.val().fileName;
        const newDoc = documents.filter(docu => {
          return docu.fileName !== toDeleteFile;
        });
        // documents = [];
        // setDocs(newDoc);
        setState({ docs: newDoc });
      },
      err => {
        console.error(err);
      }
    );

    //eslint-disable-next-line
  }, [userDetails]);
  return { docs };
};

export default useDatabase;

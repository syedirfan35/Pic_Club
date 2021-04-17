import { useState, useEffect } from "react";

import firebase from "../../firebase/config";

const useFirestore = (collection, userDetails) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const projectFirestore = firebase.firestore();
    const unsub = projectFirestore
      .collection("allImages")
      .doc(userDetails.uid)
      .collection("images")
      .orderBy("createdAt", "desc")
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [collection, userDetails]);

  return { docs };
};

export default useFirestore;

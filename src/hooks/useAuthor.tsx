import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import { useState, useEffect } from "react";
import { db } from "@/utils/FirebaseConfig";
const useAuthor = (Data: string) => {
  const [author, setAuthor] = useState<DocumentData>();
  const [img , setImg] = useState("");


  function ListenToImgChanges(){
    const DocRef = db.collection("user").doc(Data)

    const unsubscribed = DocRef.onSnapshot((DocSnap) => {
      if(DocSnap.exists){
        const data = DocSnap.data();
        if(data){
          setImg(data.PhotoUrl);
        }
      }
    })
    return unsubscribed;
  }


  useEffect(() => {
    async function FetchAuthor() {
      try {
        const DocField = await db.collection("user").doc(Data).get();
        const d = DocField.data();
        if (d) {
          setAuthor(d);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchAuthor().then(() => {});
  }, [Data]);
  return {
    author,
    setAuthor,
    ListenToImgChanges,
    Img : img,
  };
};
export default useAuthor;

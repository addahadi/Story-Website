import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { db } from "@/utils/FirebaseConfig";
import DocumentData = firebase.firestore.DocumentData;

const useFetch = (author: string) => {
  const [Data, setData] = useState<firebase.firestore.DocumentData[]>([]);
  useEffect(() => {
    let unsubscribe: () => void;

    async function ShowYourStories() {
      try {
        const CollectionsRef = db.collection("WrittenStories").where("author", "==", author);
        unsubscribe = CollectionsRef.onSnapshot((stories) => {
          const fetchedStoryArray: DocumentData[] = [];
          stories.forEach((story) => {
            const data = story.data();
            fetchedStoryArray.push({ id: story.id, ...data });
          });
          setData(fetchedStoryArray);
        });
      } catch (error) {
        console.log(error);
      }
    }

    ShowYourStories();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [author]);

  return {
    Data,
    setData,
  };
};

export default useFetch;

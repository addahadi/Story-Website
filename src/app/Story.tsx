import StoryBanner from "@/component/StoryBanner"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "@/utils/firebase";
import StoryInfo from "@/component/StoryInfo.tsx";
import CenteredCom from "@/component/CenteredCom.tsx";
import PartsCom from "@/component/PartsCom.tsx";
import RecommendedCom from "@/component/RecommendedCom";



const getChapters = async (storyId : string) => {
  try {
    // Reference to the chapters collection
    const chaptersRef = db.collection("Parts");
    const querySnapshot = await chaptersRef.where("storyId", "==", storyId).get();

    const chapters = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
};

const Story = () => {
  const { storyId } = useParams();
  const [Data, setData] = useState<firebase.firestore.DocumentData | undefined>(
    {}
  );
  const [Parts , setParts] = useState<firebase.firestore.DocumentData[]>([]);
  const [length, setLength] = useState<number>();
  useEffect(() => {
    async function GetStoryDetail() {
      try {
        const collection = await db
          .collection("WrittenStories")
          .doc(storyId)
          .get();

        getChapters(storyId ? storyId : "").then((result) => {
          if(!result) return
          console.log(result)
          setParts(result);
          setLength(result.length);
        })
        setData(collection.data());

      } catch (error) {
        console.log(error);
      }
    }
    GetStoryDetail();
  }, [storyId]);
  return (
    <div>
      <StoryBanner Data = {Data} length = {length}  Parts = {Parts[0]} />
      <CenteredCom>
        <div className=" flex w-full flex-row gap-4 mt-10 h-fit">
          <StoryInfo Data={Data}/>
          <PartsCom Parts = {Parts} />
        </div>
        <RecommendedCom Data={Data} storyId = {storyId} /> 
      </CenteredCom>

    </div>
  )
}

export default Story
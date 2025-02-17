import Panel from "./Panel";
import { StoryPanelProp } from "@/utils/type";
import { Button } from "@/component/ui/button";
import { useUser } from "@/context/UserCon.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@/component/ui/Icon.tsx";
import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";

import firebase from "firebase/compat/app";
import { StoryAttributes } from "@/utils/util";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/component/ui/toaster";
import {motion} from "framer-motion";


const Color = ["#ff4747", "#808080"];
const StoryBanner = ({ Data, length, Parts }: StoryPanelProp) => {
  const { currentUser } = useUser();

  const navigate = useNavigate();
  const { storyId } = useParams();
  const [color, setColor] = useState("#808080");
  const [isProcessing, setIsProcessing] = useState(false);
  const [IsSave, setIsSave] = useState(false);
  const [like, setLike] = useState(0);
  const [shorterTitle , setShorterTitle] = useState("")
  function Save() {
    setIsSave(!IsSave);
  }

  useEffect(() => {
    async function fetchLikeStatus() {
      if (!currentUser) return;
      try {
        const { uid } = currentUser;
        const likeDoc = await db
          .collection("WrittenStories")
          .doc(storyId)
          .collection("likes")
          .doc(uid)
          .get();

        if (likeDoc.exists) {
          setColor(Color[0]);
        } else {
          setColor(Color[1]);
        }
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    }
    fetchLikeStatus();
  }, [storyId, currentUser]);

  async function Adore() {
    if (isProcessing) return;
    setIsProcessing(true);

    const likesRef = db
      .collection("WrittenStories")
      .doc(storyId)
      .collection("likes");

    try {
      if (!currentUser) return;
      const { uid } = currentUser;
      const userLike = await likesRef.doc(uid).get();

      if (userLike.exists) {
        // Unlike
        await likesRef.doc(uid).delete();
        await db
          .collection("WrittenStories")
          .doc(storyId)
          .update({
            likes: firebase.firestore.FieldValue.increment(-1),
          });

        setColor(Color[1]);
        toast({
          title: "Unlike",
          description: `You unliked the story`,
          variant: "destructive",
        });
      } else {
        // Like
        await likesRef.doc(uid).set({ likedAt: new Date() });
        await db
          .collection("WrittenStories")
          .doc(storyId)
          .update({
            likes: firebase.firestore.FieldValue.increment(1),
          });
        setColor(Color[0]);
        toast({
          title: "Like",
          description: `You liked the story`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error handling like functionality:", err);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    let unsubscribe: () => void;
    function ListenToLike() {
      const likeRef = db.collection("WrittenStories").doc(storyId);
      unsubscribe = likeRef.onSnapshot((doc) => {
        const data = doc.data();
        setLike(data?.likes);
      });
    }
    ListenToLike();
    return () => unsubscribe();
  }, [currentUser, storyId]);


  useEffect(() => {
    if(!Data) return
    const truncatedStr = Data.title?.length > 20 ? Data.title?.slice(0, 20) + "..." : Data.title;
    setShorterTitle(truncatedStr)
  },[Data]);
  function handleClick() {
    navigate(`/session/${storyId}` , { state: { from: "story" } });
  }
  function handleReading() {
    if (!Parts) return;
    navigate(`/read/${Parts.id}`);
  }

  return (
    <section className=" py-8 flex  justify-center items-center w-full shadow-xl pr-3">
      <div className="flex gap-8  w-fit max-sm:gap-4">
        <div className=" w-fit ">
          <motion.img
              initial={{scale : 0}}
              animate={{scale : 1}}
              transition={{delay: 2}}
            src={Data && Data.ImgUrl}
            className=" rounded-md w-[330px] h-full max-lg:w-[270px] max-md:w-[230px] max-sm:[180px]"
          />
        </div>
        <div className="  py-10 flex flex-col gap-5  w-fit">
          <motion.h1
              initial={{  color : "#8266c9"}}
              animate={{  color : "#242424"}}
              transition={{delay: 2}}
              className=" text-4xl font-semibold w-max max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
            {Data && shorterTitle}
          </motion.h1>
          <div className="flex flex-row gap-2 ">
            <span className=" w-fit inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
              {Data && Data.category}
            </span>
            <Icon.heart Color={color} handleClick={Adore} />
            <Icon.save clicked={IsSave} handleClick={Save} />
          </div>

          <div>
            <div className="flex flex-row gap-4">
              {StoryAttributes.map((value, index) => {
                if (!length) return;
                const data = index == 0 ? like : length;
                const attributes = { ...value, data };
                return (
                  <div key={index}>
                    {index == 1 && (
                      <span className="w-[1px] h-full bg-black-2"></span>
                    )}
                    <Panel attributes={attributes} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              className="  w-full bg-orange-1 hover:border-2 hover:border-orange-1 hover:bg-orange-2 hover:text-black-2"
              onClick={handleReading}
            >
              Start Reading
            </Button>
            {currentUser?.uid == Data?.author ? (
              <Button
                className="  w-fit bg-orange-1 hover:border-2 hover:border-orange-1 hover:bg-orange-2 hover:text-black-2 "
                onClick={handleClick}
              >
                <Icon.plus
                  classes=" w-[5px] flex justify-center items-center "
                  Color="#fff"
                />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default StoryBanner;


import Panel from "./Panel";
import {  StoryPanelProp } from "@/utils/type";
import { Button } from "@/components/ui/button";
import {useUser} from "@/context/UserCon.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Icon} from "@/component/Icon.tsx";
import {useEffect, useState} from "react";
import {db} from "@/utils/firebase.tsx";

import firebase from "firebase/compat/app";
import { StoryAttributes } from "@/utils/util";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Color = ["#ff4747" , "#808080"]
const StoryBanner = ({Data, length, Parts} : StoryPanelProp) => {
  const {currentUser} = useUser();

  const navigate = useNavigate();
  const {storyId} = useParams();
  const [color , setColor] = useState("#808080");
  const [isProcessing, setIsProcessing] = useState(false);
  const [IsSave , setIsSave] = useState(false);
  const [like , setLike] = useState(0);

  function Save () {
    setIsSave(!IsSave);
  }



  useEffect(() => {
        async function fetchLikeStatus() {
            if(!currentUser) return
            try {
                const {uid} = currentUser;
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
    }, [storyId ,currentUser]); 

    async function Adore() {
        if (isProcessing) return;
        setIsProcessing(true);

        const likesRef = db.collection("WrittenStories").doc(storyId).collection("likes");

        try {
            if(!currentUser) return
            const {uid} = currentUser;
            const userLike = await likesRef.doc(uid).get();

            if (userLike.exists) {
                // Unlike
                await likesRef.doc(uid).delete();
                await db.collection("WrittenStories").doc(storyId).update({
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
                await db.collection("WrittenStories").doc(storyId).update({
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

      let unsubscribe:any
      function ListenToLike() {
        const likeRef = db.collection("WrittenStories").doc(storyId)
        unsubscribe = likeRef.onSnapshot((doc) => {
          const data = doc.data()
          console.log(data);
          setLike(data?.likes);
                    
        })
      }
      ListenToLike()
      return () => unsubscribe()

    },[currentUser , storyId]);




  function handleClick(){
      navigate(`/session/${storyId}`);
  }
  function handleReading(){
      if(!Parts) return
      navigate(`/read/${Parts.id}`);
  }

  return (
    <section className=" py-8 flex  justify-center items-center w-full shadow-xl">
      <div className="flex gap-8  w-fit">
        <div className=" w-fit ">
          <img
            src={Data && Data.ImgUrl}
            className=" rounded-md w-[330px] h-full"
          />
        </div>
        <div className="  py-10 flex flex-col gap-5  w-fit">
          <h1 className=" text-4xl font-semibold w-max">
            {Data && Data.title}
          </h1>
          <div className="flex flex-row gap-2 ">
            <span className=" w-fit inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
              {Data && Data.category}
            </span>
            <Icon.heart Color={color} handleClick={Adore} />
            <Icon.save clicked={IsSave} handleClick={Save} />
          </div>

          <div>
            <div className="flex flex-row gap-4">
              {StoryAttributes.map((value,index) => {
                if(!length) return 
                const data = index == 0 ? like : length;
                const attributes = { ...value, data };
                return (
                 <div>
                  {index == 1 && <span className="w-[1px] h-full bg-black-2"></span>}
                    <Panel attributes={attributes}/>
                 </div>
                )
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
      <Toaster/>
    </section>
  );
}

export default StoryBanner
import CoverImageUpload from "@/component/coverImg";
import { Button } from "@/components/ui/button";
import { useStory } from "@/context/StoryCon";
import { useUser } from "@/context/UserCon";

import { useError } from "@/hooks/useError";
import { db } from "@/utils/firebase";
import { UploadDetailsProp } from "@/utils/type";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
// @ts-ignore
import Loading from 'react-simple-loading';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;


const UploadDetails = async ({
  currentUser,
  setLoading,
  setStoryId,
  Details,
  navigate,
}: UploadDetailsProp) => {
  if (currentUser?.email) {
    try {
      const podcastID = db
        .collection("WrittenStories")
        .doc().id;
      setLoading(true);
      await db
        .collection("WrittenStories")
        .doc(podcastID)
        .set({
          title: Details.title,
          desc: Details.desc,
          category: Details.category,
          character: Details.character,
          tag: Details.tag,
          ImgUrl: Details.ImgUrl,
          author : currentUser.uid,
          likes : 0,
          time : Timestamp.now()
        });

      setStoryId(podcastID);
      navigate(`/session/${podcastID}`);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
};



const StoryDetail = () => {
  
  const {title , setTitle , desc , setDesc , category , setCategory,
    character , tag , error , Error, handleError
  } = useError()

  const [loading , setLoading] = useState(false);
  const [ImgUrl , setImgUrl] = useState('');
  const {currentUser} = useUser()
  const {setStoryId} = useStory()
  const navigate = useNavigate()

  const Details = {
    title : title,
    desc : desc,
    category : category,
    character : character.itemList,
    tag : tag.itemList,
    ImgUrl : ImgUrl,
  }

  async function handleClick(){
    handleError()
    if(error){
      console.log("yes")
      UploadDetails({currentUser , setLoading , setStoryId  , Details , navigate});
    }
  }

  return (
    <div>
      <div className="flex flex-row w-full h-fit absolute left-0">
        <div className=" flex justify-center items-center bg-orange-300">
          <img
            src="../public/writeS.webp"
            width={500}
            className="h-full"
            />
        </div>
        <div className=" flex-1 pt-5 px-4 h-full   w-2/5 relative">
          <div className=" pb-5 border-orange-1 border-b-[6px] w-fit">
            <h1 className=" text-xl font-medium  text-black-2">Story Details</h1>
          </div>
          <div className=" w-full h-[0.5px] bg-white-4 absolute left-0">

          </div>
          <div className=" w-full p-5 flex flex-col gap-6">
            <CoverImageUpload setImgUrl = {setImgUrl}/>
            <div className="flex flex-col gap-1">
              <label className="block font-semibold mb-1 text-lg">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Story"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block font-semibold mb-1 text-lg">
                Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Write your story description..."
                className="w-full border border-gray-300 rounded p-2 h-24"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block font-semibold mb-1 text-lg">
                Main Characters
              </label>
              <div className="flex gap-2">
                <input
                  value={character.item}
                  onChange={(e) => character.setItem(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <button
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                  onClick={() => {
                    character.addItem();
                    console.log(character.itemList)
                  }}
                >
                  +
                </button>
              </div>
              <div className="mt-2">
                {character.itemList?.map((name) => {
                  return (
                    <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="block font-semibold mb-1 text-lg">
                Category
              </label>
              <select className="w-full border border-gray-300 rounded p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Adventure">Adventure</option>
                <option value="Romance">Romance</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="block font-semibold mb-1 text-lg">Tags</label>
              <div className="flex gap-2">
                <input
                  value={tag.item}
                  onChange={(e) => tag.setItem(e.target.value)}
                  type="text"
                  placeholder="Add a tag"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <button
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                  onClick={() => {
                    tag.addItem();
                  }}
                >
                  +
                </button>
              </div>
              <div className="mt-2">
                {tag.itemList.map((name) => {
                  return (
                    <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {name}
                    </span>
                  );
                })}
              </div>
          </div>
            <Button className=" font-light text-lg  bg-orange-1" onClick={handleClick}>
                {loading ? <Loading  size={"20px"}  /> : <span>Save</span>}
            </Button>
          </div>
        </div>
      </div>
      <Error/>
    </div>
  );
}

export default StoryDetail
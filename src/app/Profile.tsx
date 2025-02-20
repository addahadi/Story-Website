import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import { Link, Outlet, useParams } from "react-router-dom";
import cn from "classnames";
import { Button } from "@/component/ui/button.tsx";
import { useUser } from "@/context/UserCon.tsx";
import useFollow from "@/hooks/useFollow.tsx";
import { ListenToFollowers } from "@/utils/Follow";
import { Toaster } from "@/component/ui/toaster";
import {motion} from "framer-motion";
import UserProfile from "@/component/UserProfile.tsx";

const Profile = () => {
  const { profileId } = useParams();
  const [Data, setData] = useState<DocumentData | undefined>({});
  const [showAbout, setShowAbout] = useState<boolean>(true);
  const [showHome, setShowHome] = useState<boolean>(false);
  const [FollowersCount, setFollowersCount] = useState(0);
  const { currentUser } = useUser();
  const { isFollow, toggleFollow, isProcessing } = useFollow(
    profileId,
    currentUser
  );
  useEffect(() => {
    async function FetchUser() {
      try {
        const Doc = await db.collection("user").doc(profileId).get();
        const DocField = Doc.data();
        if (!DocField) return;
        setData(Doc.data());
      } catch (error) {
        console.log(error);
      }
    }
    FetchUser();
  }, [profileId, currentUser]);

  useEffect(() => {
    const subscribe = ListenToFollowers(currentUser, setFollowersCount);
    return () => subscribe();
  }, [currentUser]);


  return (
    <div
        className="max-w-[1200px] mx-auto lg:px-7">
      <section className="pt-16 flex flex-col gap-10 max-lg:px-5 border-b border-black-2">
        <div className="flex py-16 flex-col gap-8 max-lg:hidden">
          {Data?.name && (
              <motion.h1
                initial={{ color : "#8266c9"}}
                animate={{ color : "#242424"}}
                transition={{delay : 2}}
                className=" text-6xl text-black-2 font-semibold">{Data.name}</motion.h1>
          )
            }
          <div className=" flex gap-2 items-center justify-between w-fit">
            <h1 className=" text-lg text-black-2 ">{Data ? Data.name : ""}</h1>
            {currentUser?.uid != profileId && (
              <Button
                disabled={isProcessing}
                variant="destructive"
                onClick={toggleFollow}
              >
                {isFollow ? <span>unfollow</span> : <span>follow</span>}
              </Button>
            )}
          </div>
        </div>
        <div className=" lg:hidden">
          <UserProfile Data={Data} FollowersCount={FollowersCount} />
          <div className="flex mt-8  items-center w-full">
              {currentUser?.uid != profileId && (
                  <Button
                      disabled={isProcessing}
                      variant="destructive"
                      onClick={toggleFollow}
                  >
                    {isFollow ? <span>unfollow</span> : <span>follow</span>}
                  </Button>
              )}
          </div>
        </div>
        <div>
          <ul className=" text-black-2  text-sm font-semibold flex items-center gap-10">
            <Link to="about">
              <li
                onClick={() => {
                  setShowAbout(true);
                  setShowHome(false);
                }}
                className={cn("cursor-pointer hover:text-white-2 pb-4", {
                  "border-b-4 border-orange-1": showAbout,
                })}
              >
                Home
              </li>
            </Link>
            <Link to="home">
              <li
                onClick={() => {
                  setShowAbout(false);
                  setShowHome(true);
                }}
                className={cn("cursor-pointer hover:text-white-2 pb-4", {
                  "border-b-4 border-orange-1": showHome,
                })}
              >
                About
              </li>
            </Link>
          </ul>
        </div>
      </section>
      <div className="flex flex-row p-6 gap-4">
        <Outlet />
        <div className=" p-4 max-lg:hidden w-[30%] border-l border-black-2">
          <UserProfile  Data={Data} FollowersCount={FollowersCount}/>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;

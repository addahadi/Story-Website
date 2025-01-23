import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import { Link, Outlet, useParams } from "react-router-dom";
import cn from "classnames";
import Panel from "@/component/Panel.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUser } from "@/context/UserCon.tsx";
import useFollow from "@/hooks/useFollow.tsx";
import { ProfileAttributes } from "@/utils/util";
import { ListenToFollowers } from "@/utils/Follow";
import { Toaster } from "@/components/ui/toaster";

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
    <div className="max-w-[1200px] mx-auto">
      <section className="pt-16 flex flex-col gap-10 border-b border-black-2">
        <div className="flex py-6 flex-col gap-8">
          <h1 className=" text-5xl text-black-2 font-semibold">
            {Data ? Data.name : ""}
          </h1>
          <div className=" flex gap-2 items-center justify-between w-fit">
            <h1 className=" text-lg text-black-2 ">{Data ? Data.name : ""}</h1>
            {currentUser?.uid != profileId && (
              <Button
                disabled={isProcessing}
                variant={!isFollow ? "follow" : "outFollow"}
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
                About
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
                Home
              </li>
            </Link>
          </ul>
        </div>
      </section>
      <div className="flex flex-row p-6 gap-4">
        <Outlet />
        <div className=" p-4 flex flex-col w-[30%] items-center border-l border-black-2 px-6  gap-5">
          <img
            src={Data ? Data.PhotoUrl : ""}
            width={80}
            className="rounded-full"
          />
          <h1 className="text-black-2 font-semibold text-center">
            <span>{Data ? Data.name : ""}</span>
          </h1>
          <div className="flex flex-row gap-2 justify-center items-center">
            {ProfileAttributes.map((value, index) => {
              if (!Data) return;
              const data = index == 0 ? Data.likes : FollowersCount;
              const attributes = { ...value, data };
              return (
                <>
                  {index == 1 && (
                    <div className=" w-[1px] bg-black-2 h-full mr-2"></div>
                  )}
                  <Panel attributes={attributes} />
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;

import {ProfileAttributes} from "@/utils/util.tsx";
import Panel from "@/component/Panel.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import React, {useEffect, useRef, useState} from "react";
import {ApiController} from "@/utils/CloudConfig.tsx";
// @ts-ignore
import Loading from "react-simple-loading";
import useAuthor from "@/hooks/useAuthor.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {useUser} from "@/context/UserCon.tsx";

const UserProfile = ({profileId,  Data , FollowersCount} : {profileId : string | undefined , Data : DocumentData | undefined, FollowersCount : number}) => {
    const InputRef = useRef<HTMLInputElement>(null)
    const [loading ,setLoading] = useState(false)
    const {currentUser} = useUser();
    const {Img,ListenToImgChanges} = useAuthor(profileId ? profileId  : "")
    async function handleImg(event : React.ChangeEvent<HTMLInputElement> ){
       try {
           await ApiController().ChangingImg(event ,profileId ? profileId : "", setLoading)
       }
       catch(error){
           const letter = error as Record<string, string>
           toast({
               title: "Error",
               description : letter.message,
           })
       }

    }

    useEffect(() => {
        const unsubscribe = ListenToImgChanges()
        return () => unsubscribe()
    },[ListenToImgChanges])

    return (
        <div className=" w-full flex flex-col items-center  px-6 gap-5 max-lg:gap-8">
            <input
                ref={InputRef}
                type="file"
                id="cover-image"
                accept="image/*"
                className=" hidden"
                onChange={handleImg}
            />
            <div className="relative w-fit">
                { currentUser?.uid == profileId &&
                    <div className="absolute top-0 right-0 cursor-pointer" onClick={() => InputRef.current?.click()}>
                        {!loading ?
                            (<div className="bg-orange-2 border-4 border-white-1 w-fit h-fit rounded-full">
                                    <img src="/Story-Website/camera.svg" alt="google" width={30}/>
                                </div>
                            )
                            : (<Loading size={"18px"} />)}
                    </div>}
                {
                    Img?
                        (<div className=" w-[130px] h-[130px] overflow-hidden rounded-full">
                                <img
                                    src={Img}
                                    className=" w-full h-full object-center"
                                />
                            </div>)
                        :
                        (
                            <img
                                src="/Story-Website/user.svg" width={120}
                                className="rounded-full lg:width-[40px] max-lg:width-[60px] max-md:width-[50px]"
                            />
                        )
                }
            </div>
            <h1 className="text-black-2 font-semibold text-center max-lg:text-xl max-md:text-lg">
                <span>{Data ? Data.name : ""}</span>
            </h1>
            <div className="flex flex-row gap-2 justify-center items-center">
                {ProfileAttributes.map((value, index) => {
                    if (!Data) return;
                    console.log(Data.PhotoUrl)
                    const data = index == 0 ? Data.likes : FollowersCount;
                    const attributes = {...value, data};
                    return (
                        <>
                            {index == 1 && (
                                <div key={index} className=" w-[3px] bg-black-2 h-full mr-2"></div>
                            )}
                            <Panel attributes={attributes}/>
                        </>
                    );
                })}
            </div>
        </div>
    )
}

export default UserProfile;
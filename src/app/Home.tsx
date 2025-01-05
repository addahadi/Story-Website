import {Button} from "@/components/ui/button.tsx";
import { useState} from "react";
import EditProfile from "@/component/EditProfile.tsx";
import {useParams} from "react-router-dom";
import useAuthor from "@/hooks/useAuthor.tsx";
import { useUser } from "@/context/UserCon";


const Home = () => {
    const [edit , setEdit] = useState(false);
    const {profileId} = useParams();
    const {author} = useAuthor(profileId ? profileId : "");
    const {currentUser} = useUser()
    if(edit) return <EditProfile profileId={profileId ? profileId : ""} />

    if(author){
        return (
            <div className=" flex-1">
                {
                    author?.desc ?
                        <div>
                            <div className="flex flex-col gap-6  py-6 px-5  bg-white-3 w-full ">
                                <h1 className="text-xl font-semibold text-black-2">Who I am</h1>
                                <p className="text-lg text-black-2 leading-10 w-full">
                                    {author.desc}
                                </p>
                            </div>
                        </div>
                        :(
                            currentUser?.uid == profileId ?
                        <div className="flex flex-col w-full gap-6 justify-between py-6 px-5 items-center bg-white-3 ">
                            <h1 className=" font-semibold text-black-2">Tell the world about yourself</h1>
                            <p className="text-sm w-[600px] text-center ">
                                Here’s where you can share more about yourself: your history, work experience,
                                accomplishments,
                                interests, dreams, and more. You can even add images and use rich text to personalize your
                                bio.
                            </p>
                            <Button variant="outline" className="rounded-full" onClick={() => setEdit(true)}>
                                Get started
                            </Button>
                        </div>: <span>nothing</span>

                        )
                }
            </div>
        )
    }

}
export default Home
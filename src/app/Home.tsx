import {Button} from "@/component/ui/button.tsx";
import {useEffect, useState} from "react";
import EditProfile from "@/component/EditProfile.tsx";
import {useParams} from "react-router-dom";
import useAuthor from "@/hooks/useAuthor.tsx";
import { useUser } from "@/context/UserCon";
// @ts-ignore
import Loading from "react-simple-loading";


const Home = () => {
    const [edit , setEdit] = useState(false);
    const {profileId} = useParams();
    const {author} = useAuthor(profileId ? profileId : "");
    const {currentUser} = useUser()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (author) {
            setLoading(false);
        }
    }, [author]);


    async function handleEdit(){
        setEdit(true);
    }
    if(edit) return <EditProfile profileId={profileId ? profileId : ""} />

        return (
            <div className="flex-1">
                {loading ? (
                    <div className="flex justify-center items-center py-6">
                        <Loading size="30px"/>
                    </div>
                ) : (author?.desc ? (
                    <div className="w-full">
                        <div className="flex flex-col gap-6 py-6 px-5 border-b-2 border-[#dbdbdb] w-full">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl text-black-2">Who I am</h1>
                                {currentUser?.uid == profileId && (
                                    <div onClick={handleEdit} className="p-2 flex items-center  cursor-pointer transition-colors border border-white-1 justify-center w-fit rounded-full hover:bg-orange-2 hover:border hover:border-orange-1">
                                        <img src="/Story-Website/edit.svg" width={20}/>
                                    </div>

                                )}
                            </div>
                            <div
                                className="text-black-2 leading-6 w-full"
                                style={{overflowWrap: "break-word", wordBreak: "break-word"}}
                            >
                                {author.desc}
                            </div>
                        </div>
                    </div>
                ) : currentUser?.uid === profileId ? (
                    <div className="flex flex-col w-full gap-6 justify-between py-6 px-5 items-center bg-white-3">
                        <h1 className="font-semibold text-black-2">Tell the world about yourself</h1>
                        <p className="text-sm max-w-[600px] text-center">
                            Here’s where you can share more about yourself: your history, work experience,
                            accomplishments, interests, dreams, and more. You can even add images and use rich text to
                            personalize your bio.
                        </p>
                        <Button variant="outline" className="rounded-full" onClick={() => setEdit(true)}>
                            Get started
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 justify-center items-center py-6 text-gray-600 text-sm">
                        <img src="/Story-Website/person-sitting.png" width={150} />
                        <p>Mysterious user detected! Maybe they'll reveal more soon. 👀</p>
                    </div>
                ))}
            </div>
        )
}
export default Home
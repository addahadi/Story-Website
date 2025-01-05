
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import useAuthor from "@/hooks/useAuthor.tsx";
import { Link } from "react-router-dom";
const StoryInfo = ({Data} : {Data : DocumentData |undefined}) => {
    const {author} = useAuthor(Data && Data.author)
    return (
        <div className=" border-2 w-full h-fit  rounded-lg flex flex-col gap-3 p-5">
            <Link to={`/profile/${Data && Data.author}/about`}  className="flex gap-2 items-center">
                <img  alt="User" src={ author?.PhotoUrl ? author?.PhotoUrl  : ""} width={30}/>
                <span>{author?.name ? author?.name : ""}</span>
            </Link>
            <div>
                <p className=" text-black-2  leading-7">
                    {Data && Data.desc}
                </p>
            </div>
            <div className="flex gap-2 flex-wrap">
                {Data && Data.tag?.map((value : string,index:number) => {
                    return (
                        <span key={index}
                            className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {value}
                    </span>
                    )
                })}
            </div>
        </div>
    )
}
export default StoryInfo;
import {PartCom} from "@/utils/type.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;


const PartsCom  = ({Parts} :{Parts :  PartCom}) => {
    return (
        <div className=" border-2 p-3 flex flex-col gap-3 rounded-lg 2xl:w-[400px] lg:w-[360px]  max-lg:w-full">
            <h1 className="text-xl font-semibold  text-black-2">
                Table of contents
            </h1>
            <div className="flex flex-col gap-5 p-3.5">
                {
                 Parts ? Parts.map((value : DocumentData | undefined, index : number) => {
                     if(!value?.title) return
                     const truncatedStr = value.title.length > 20 ? value.title.slice(0, 20) + "..." : value.title

                     return (
                         <div key={index} className=" text-lg flex flex-row gap-3 items-center">
                             <span>
                                 Part-{index + 1} :
                             </span>
                             <span>
                                 {truncatedStr}
                             </span>
                         </div>
                     )
                 }) : null
                }
            </div>

        </div>
    )
}
export default PartsCom
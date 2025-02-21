

import firebase from "firebase/compat/app";
import {useState , useEffect} from "react";
import {quillDataProps,} from "@/utils/type.tsx";
import handleAttributes from "@/utils/util";
const TextField = ({Data} : {Data: firebase.firestore.DocumentData | undefined}) => {

    const [Textdata ,setTextData] = useState<firebase.firestore.DocumentData>([]);
    useEffect(() => {
        if(Data){
            const {data} = Data;

            setTextData(data);
            console.log(data)
        }
    },[Data])
    return (
        <div className=" text-lg leading-relaxed">
            {Textdata.map((data : quillDataProps) => {
                let style = ""
                if(data.hasOwnProperty("attributes")){
                    style = handleAttributes(data.attributes);   
                }
                if(typeof data.insert === "object"){
                    const Insert : Record<string, string> = data.insert as Record<string , string>
                   return <div className="flex border-2 border-black-2 rounded-md mt-4 mb-4 justify-center items-center h-fit py-6 px-2.5">
                       <img src={Insert.image}  width={400} alt="img" className=" rounded-md"/>
                   </div>;
                }
                return (
                    <div className={`${style}`}>
                        {data.insert}
                    </div>
                )
            })}
        </div>
    )
}

export default TextField
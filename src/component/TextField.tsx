

import firebase from "firebase/compat/app";
import {useState , useEffect, useRef} from "react";
import {quillDataProps, TextDataProps} from "@/utils/type.tsx";
import handleAttributes from "@/utils/util";
const TextField = ({Data} : {Data: firebase.firestore.DocumentData | undefined}) => {

    const [Textdata ,setTextData] = useState<firebase.firestore.DocumentData>([]);
    const ParaRef = useRef<HTMLParagraphElement>(null)
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
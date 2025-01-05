

import firebase from "firebase/compat/app";
import {useState , useEffect, useRef} from "react";
import {TextDataProps} from "@/utils/type.tsx";
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
        <div>
            {Textdata?.map((value : TextDataProps , index : number) => {
                const {data : {text} , type} = value
                if(type == 'paragraph') {
                    return (
                        <p className=" text-black-2 text-lg  leading-9" key={index} ref={ParaRef} >{text}</p>
                    )
                }
                return

            })}
        </div>
    )
}

export default TextField
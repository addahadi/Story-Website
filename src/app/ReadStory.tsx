import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {db} from "@/utils/firebase.tsx";
import firebase from "firebase/compat/app";
import TextField from "@/component/TextField.tsx";
import AuthorDetail from "@/component/AuthorDetail.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react"
import {useNavigate} from "react-router-dom";




const GetNextPart=  async (
    currentDocId :  string | undefined, setNextDocId :  React.Dispatch<React.SetStateAction<string>>,
    DocField : firebase.firestore.DocumentData,
    setDocs : React.Dispatch<React.SetStateAction<firebase.firestore.DocumentData[]>> ) => {
    try{
        const query = await db.collection("Parts").where("storyId","==",DocField.storyId).get()
        const docs = query.docs
        const currentIndex = docs.findIndex((doc) => doc.id === currentDocId);
        
        const data = docs.map((doc) => {
            return {id : doc.id , ...doc.data()}
        })
        setDocs(data);
        if (currentIndex === -1) return null;

        const nextDoc = docs[currentIndex + 1];
        if (nextDoc) setNextDocId(nextDoc.id)
        else return null
    }
    catch (error) {
        console.error("Error getting documents:", error);
    }
}



const ReadStory = () => {
    const {readId} = useParams();
    const [Data,setData] = useState< firebase.firestore.DocumentData | undefined>();
    const [Owner , setOwner] = useState<string>('')
    const [nextDocId , setNextDocId] = useState<string>('')
    const [docs , setDocs] = useState<firebase.firestore.DocumentData[]>([])
    const [storyData , setStoryData] = useState<firebase.firestore.DocumentData>([])
    const navigate = useNavigate()
    
    useEffect(() => {
        async function FetchPart(){
            try{
                const Doc = await  db.collection("Parts").doc(readId).get()
                const DocField = Doc.data()
                if(!DocField) return
                GetNextPart(readId, setNextDocId , DocField,setDocs)
                await db.collection("WrittenStories").doc(DocField.storyId).get().then((r) => {
                    const d = r.data()
                    if(d){
                        setStoryData(d);
                        setOwner(d.author);
                    }
                })
                setData(DocField);
            }
            catch (error) {
                console.log(error)
            }
        }
        FetchPart().then(() => {
        })
    }, [readId,nextDocId]);
    return (
        <div className="flex flex-row relative">
            <div className="  sticky top-0 left-0">
                <select className=" px-10 py-3 w-full" onChange={(e) => navigate(`/read/${e.target.value}`)} >
                  <option>
                    <div className="flex gap-3 items-center">
                        <div className="flex  flex-col gap-2">
                            <span>{storyData.title}</span>
                        </div>
                    </div>
                  </option>
                  {docs.map((doc) => {
                    console.log(doc.title)
                    return (
                    <option value={doc.id}  className=" text-black-2">
                        {doc.title}
                    </option>)
                  })}
                </select>
            </div>
            <div className=" mx-auto border-x-2 p-6 flex-1">

                <div className="flex flex-col gap-3 mb-7">
                    <h1 className="text-black-2 text-4xl font-semibold ">
                        {Data ? Data.title : ""}
                    </h1>
                    <AuthorDetail owner={Owner}/>
                </div>
                <TextField Data = {Data} ></TextField>
                {
                nextDocId != readId ?  <Button className="w-full mt-4" onClick={() => navigate(`/read/${nextDocId}`)}>Next Part</Button> : null
                }

            </div>
        </div>

    )
}


export default ReadStory
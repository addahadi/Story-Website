import Editor from "@/component/Editor"
import Loader from "@/component/Loader"
import { Button } from "@/components/ui/button"

import { db } from "@/utils/firebase"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
// @ts-ignore
import Loading from 'react-simple-loading';
import {useUser} from "@/context/UserCon.tsx";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { sendNewNotfication } from "@/utils/Notification"



const Sessions = () => {
  const {currentUser} = useUser()
  const [word , setWord] = useState<number>(0)
  const [title , setTitle] = useState<string  | TrustedHTML>("Untitled");
  const [Issave , setIsSave] = useState(false)
  const [Data , setData] = useState({})
  const [isloading , setIsLoading] = useState(false);
  const {sessionId} = useParams()
  const navigate = useNavigate()
  
  
  function handleClick(){
    setIsSave(true);
  }

  useEffect(() => {
    async function StoreData(){

        if (Data && Object.keys(Data).length > 0) {
            try {
              setIsLoading(true)
              const PartId = db
                .collection("Parts")
                .doc().id
              await db
                .collection("Parts")
                .doc(PartId)
                .set({
                  title: title,
                  data: Data,
                  storyId : sessionId,
                  time : Timestamp.now()

            });
            await sendNewNotfication(currentUser,PartId);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
            navigate('/');
          }
        }
    }
    StoreData()
  },[Data]);
  return (
    <div>
        <header className=" m-auto max-w-[1000px]">
            <div className=" py-4 flex"> 
                <div className=" flex flex-row gap-3 flex-1">
                    <Link to="/" >
                     <img src="../public/logo.svg" width={40} height={40}/>
                    </Link>
                    <div className="flex flex-col ">
                    <h1 className=" text-lg">{title as number}</h1>
                    <div className="
                    flex flex-row
                      text-black-2 gap-1  items-end
                    ">
                        <span>{word}</span>
                        <span>words</span>
                    </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-3">
                    <div>
                        <img src={currentUser?.photoURL ? currentUser?.photoURL : ""} 
                        className=" rounded-full w-[40px]"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outlineR">cancel</Button>
                        <Button variant="rounded" onClick={handleClick}>Save</Button>
                    </div>
                </div>
            </div>
        </header>
        <main className="m-auto mt-4  max-w-[800px]">
            <Editor  setTitle = {setTitle} Issave = {Issave}  setData = {setData} setWord = {setWord}/>
        </main>
        {isloading ?
            <Loader>
                <div className=" flex gap-3 text-xl">
                    <Loading size={'60px'} />
                </div>
            </Loader> : ''
        }
    </div>
  )
}

export default Sessions
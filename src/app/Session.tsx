import Editor from "@/component/Editor";
import Loader from "@/component/Loader";
import { Button } from "@/components/ui/button";

import { db } from "@/utils/FirebaseConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import Loading from "react-simple-loading";
import { useUser } from "@/context/UserCon.tsx";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { sendNewNotfication } from "@/utils/Notification";
import Suggestions from "@/component/Suggestions";
import DynamicTextarea from "@/component/DynamicTextArea";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Op } from "quill";



const Sessions = () => {
  const { currentUser } = useUser();
  const [word, setWord] = useState<number>(0);
  const [title, setTitle] = useState<string | TrustedHTML>("");
  const [Issave, setIsSave] = useState(false);
  const [Data, setData] = useState<Op[]>([]);
  const [isloading, setIsLoading] = useState(false);

  const [selectedText, setSelectedText] = useState("");
  const { sessionId } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    setIsSave(true);
  }

  useEffect(() => {
    async function StoreData() {
      if(!title){
        toast({
          description:"Give a title please"
        })
        return 
      }
      if (typeof Data[0].insert === "string" && Data[0].insert?.length < 10) {
        toast({
          description: "Over 60 words please",
        });
        return;
      }
      try {
          setIsLoading(true);
          const PartId = db.collection("Parts").doc().id;
          await db.collection("Parts").doc(PartId).set({
            title: title,
            data: Data,
            storyId: sessionId,
            time: Timestamp.now(),
          });
          await sendNewNotfication(currentUser, PartId);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          navigate("/");
        }
      }
    StoreData();
  }, [Data]);
  return (
    <div className=" w-full bg-white-3 ">
      <header className=" m-auto max-w-[1400px]">
        <div className=" py-4 flex">
          <div className=" flex flex-row gap-3 flex-1">
            <Link to="/">
              <img src="../public/logo.svg" width={40} height={40} />
            </Link>
            <div className="flex flex-col ">
              <h1 className=" text-lg">{title as number}</h1>
              <div
                className="
                    flex flex-row
                      text-black-2 gap-1  items-end
                    "
              >
                <span>{word}</span>
                <span>words</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3">
            <div>
              <img
                src={currentUser?.photoURL ? currentUser?.photoURL : ""}
                className=" rounded-full w-[40px]"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outlineR">cancel</Button>
              <Button variant="rounded" onClick={handleClick}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="m-auto mt-4  max-w-[1300px]">
        <DynamicTextarea setTitle={setTitle} />
        <div className=" flex flex-row w-full gap-3 mt-4">
          <Editor issave={Issave} setdata={setData} setIssave={setIsSave} setWord={setWord} />
          <Suggestions
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
        </div>
      </main>
      {isloading ? (
        <Loader>
          <div className=" flex gap-3 text-xl">
            <Loading size={"60px"} />
          </div>
        </Loader>
      ) : (
        ""
      )}
      <Toaster />
    </div>
  );
};

export default Sessions;

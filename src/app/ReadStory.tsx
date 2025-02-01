import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";
import firebase from "firebase/compat/app";
import TextField from "@/component/TextField.tsx";
import AuthorDetail from "@/component/AuthorDetail.tsx";
import { Button } from "@/component/ui/button.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import Slider from "@/component/ui/slider.tsx";
const GetNextPart = async (
  currentDocId: string | undefined,
  setNextDocId: React.Dispatch<React.SetStateAction<string>>,
  DocField: firebase.firestore.DocumentData,
  setDocs: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData[]>
  >
) => {
  try {
    const query = await db
      .collection("Parts")
      .where("storyId", "==", DocField.storyId)
      .get();
    const docs = query.docs;
    const currentIndex = docs.findIndex((doc) => doc.id === currentDocId);

    const data = docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setDocs(data);
    if (currentIndex === -1) return null;

    const nextDoc = docs[currentIndex + 1];
    if (nextDoc) setNextDocId(nextDoc.id);
    else return null;
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};

const ReadStory = () => {
  const { readId } = useParams();
  const [Data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  const [Owner, setOwner] = useState<string>("");
  const [nextDocId, setNextDocId] = useState<string>("");
  const [docs, setDocs] = useState<firebase.firestore.DocumentData[]>([]);
  const navigate = useNavigate()
  const [isliding , setIsliding] = useState(false)
  useEffect(() => {
    async function FetchPart() {
      try {
        const Doc = await db.collection("Parts").doc(readId).get();
        const DocField = Doc.data();
        if (!DocField) return;
        GetNextPart(readId, setNextDocId, DocField, setDocs);
        await db
          .collection("WrittenStories")
          .doc(DocField.storyId)
          .get()
          .then((r) => {
            const d = r.data();
            if (d) {
              setOwner(d.author);

            }
          });
        setData(DocField);
        setIsliding(true);
      } catch (error) {
        console.log(error);
      }
    }
    FetchPart().then(() => {});
  }, [readId, nextDocId]);
  return (
      <div className="relative">
        <Slider isliding={isliding} />
        <div className="flex flex-row bg-white-1 w-full">
          <div className="relative z-10">
            <Select onValueChange={(e) => navigate(`/read/${e}`)}>
              <SelectTrigger className="   sticky top-[80px] left-0 px-10 py-6  w-[300px]">
                <SelectValue placeholder="Table of contents"></SelectValue>
              </SelectTrigger>
              <SelectContent className=" outline-none focus:border top-11">
                {docs.map((doc) => {
                  return (
                    <SelectItem value={doc.id} className=" text-black-2">
                      {doc.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className=" mx-auto border-x-2 p-6 flex-1">
          <div className="flex flex-col gap-3 mb-7">
              <h1 className="text-black-2 text-4xl font-semibold ">
                {Data ? Data.title : ""}
              </h1>
              <AuthorDetail owner={Owner} />
            </div>
            <TextField Data={Data}></TextField>
            {nextDocId != readId ? (
              <Button
                className="w-full mt-4"
                onClick={() => navigate(`/read/${nextDocId}`)}
              >
                Next Part
              </Button>
            ) : null}
          </div>
        </div>
      </div>
  );
};

export default ReadStory;

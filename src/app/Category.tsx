import {useUser} from "@/context/UserCon.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {db} from "@/utils/FirebaseConfig.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import CenteredCom from "@/component/CenteredCom.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx"

import StoryCard from "@/component/StoryCard.tsx";
import {DetailsProp} from "@/utils/type.tsx";



const Category = () => {
    const {currentUser}  = useUser()
    const {categoryId} = useParams()
    const [Data , setData] = useState<DetailsProp[]>([]);
    const [search , setSearch] = useState("");
    const [targetValue , setTargetValue] = useState<DetailsProp[]>([]);
    useEffect(() => {
        async function FetchStories(){
            try {
                console.log(categoryId)
                const query = await db.collection("WrittenStories").where("category" ,"==", categoryId).get()
                const docs = query.docs;
                const Documents : DetailsProp[] = []
                docs.forEach((doc) => {
                    const docdata = doc.data()
                    // @ts-ignore
                    Documents.push({id : doc.id , ...docdata});
                })
                setData(Documents);
            }
            catch(error){
                console.log(error)
            }
        }
        FetchStories();
    },[currentUser , categoryId])

    function Search(){
       if(!search) return
        if(Data.length == 0) return
       const filteredData = Data.map(( strdata: DocumentData) =>  {
           let score = 0;
           const targetTags : string[]  = strdata.tag.filter((Tag:string) => {
               return search.includes(Tag)
           })
           score += targetTags.length

           if(strdata.title.toLowerCase().includes(search.toLowerCase())){
               score += 0.5
           }
           return {...strdata, score}
       })
       const NonZeroScore = filteredData.filter((a) => {
           return a.score != 0;
       })
       // @ts-ignore
       const SortedFilterdData :DetailsProp[] = NonZeroScore.sort((a , b) => {
           return b.score - a.score;
       })
        console.log(SortedFilterdData);
       setTargetValue(SortedFilterdData);
    }



    return (
        <CenteredCom>
            <div className=" py-10 flex flex-col gap-12 justify-center items-center">
                <div className=" text-5xl font-semibold text-black-2 flex flex-row items-center   gap-2">
                    <span>{categoryId}</span>
                    <span
                        className=" bg-orange-2 border-2 border-orange-1 rounded-md py-2 px-2 text-black-2">story</span>
                </div>
                <div className="flex flex-row gap-2 mt-20 items-center">
                    <Input onChange={(e) => setSearch(e.target.value)} value={search} type="search"
                           className=" rounded-none w-[500px] max-w-[500px] py-3 border-2 border-black-2"
                           placeholder="search here"/>
                    <Button variant="follow" className="rounded-none" onClick={Search}>
                        Search
                    </Button>
                </div>
            </div>
            {
                search ? <main className=" p-5 flex flex-row gap-5 flex-wrap">
                {targetValue.length > 0 ? targetValue.map((item) => {
                    const {title} = item
                    const truncatedStr = title.length > 30 ? title.slice(0, 30) + "..." : title;
                    return (
                        <StoryCard key={item.id} items={item} truncatedStr={truncatedStr}/>

                    )
                }) :
                <div className=" flex w-full items-center mt-8 justify-center">
                    <img src="../public/SearchEr.jpg"  width={250}/>
                </div>
                }
            </main>
            :
                    <main className=" p-5 flex flex-row gap-5 flex-wrap">
                        {Data.map((item) => {
                            const {title} = item
                            const truncatedStr = title.length > 30 ? title.slice(0, 30) + "..." : title;
                            return (
                                <StoryCard key={item.id} items={item} truncatedStr={truncatedStr}/>
                            )
                        })}
                    </main>
            }
        </CenteredCom>
    )
}
export default Category
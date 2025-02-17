import {useUser} from "@/context/UserCon.tsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {db} from "@/utils/FirebaseConfig.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

import {Button} from "@/component/ui/button.tsx";
import {Input} from "@/component/ui/input.tsx"

import StoryCard from "@/component/StoryCard.tsx";
import {DetailsProp} from "@/utils/type.tsx";
import {genreColors, getTextColor} from "@/utils/util.tsx";
import {motion} from "framer-motion";
import {StoriesProps} from "@/utils/type.tsx";

const Category = () => {
    const {currentUser}  = useUser()
    const {categoryId} = useParams()
    const [Data , setData] = useState<DetailsProp[]>([]);
    const [search , setSearch] = useState("");
    const [targetValue , setTargetValue] = useState<DetailsProp[]>([]);
    const [categories ,setCategories] = useState<Array<Record<string, string>>>([])


    useEffect(() => {
        async function FetchStories(){
            try {
                console.log(categoryId)
                const query = await db.collection("WrittenStories").where("category" ,"==", categoryId).get()
                const docs = query.docs;
                const Documents : DetailsProp[] = []
                docs.forEach((doc) => {
                    const docdata = doc.data()
                    const extendData : unknown = {id : doc.id , ...docdata}
                    Documents.push(extendData as DetailsProp);
                })
                setData(Documents);
                setTargetValue(Documents);
            }
            catch(error){
                console.log(error)
            }
        }
        FetchStories();
    },[currentUser , categoryId])

    useEffect(() => {
        setCategories(genreColors)
    },[categoryId])


    function Search(){
       if(!search) {
           setTargetValue(Data);
           return
       }
       console.log(Data);
       const filteredData = Data.map(( strdata: DocumentData) =>  {
           let score = 0;
           const targetTags : string[]  = strdata.tag.filter((Tag:string) => {
               return Tag.includes(search)
           })
           score += targetTags.length

           if(strdata.title.toLowerCase().includes(search.toLowerCase())){
               score += 0.5
           }
           return {...strdata, score}
       })
       const NonZeroScore : unknown = filteredData.filter((a) => {
           return a.score != 0;
       })

       const SortedFilterdData : StoriesProps[] = (NonZeroScore as StoriesProps[]).sort((a , b) => {
           return b.score - a.score;
       })

       setTargetValue(SortedFilterdData);
    }



    return (
        <div className="max-w-[1200px] m-auto">
            <div className=" py-10 flex flex-col gap-12 justify-center items-center">

                <div className="flex flex-row gap-1 mt-20 items-center w-full px-5">
                    <Input onChange={(e) => setSearch(e.target.value)} value={search} type="search"
                           className=" rounded-lg py-6 border-2 flex-1"
                           placeholder="search here"/>
                    <Button variant="outline" className=" border-2  rounded-xl" onClick={Search}>
                        <img src="../public/search.svg" width={20}/>
                    </Button>

                </div>
                <div className="flex flex-row gap-6 flex-wrap px-5">
                    {
                        categories.length > 0 && categories.map((categorie, index: number) => {
                            const {genre, color , hoverColor} = categorie
                            const textColor = getTextColor(color)

                            return (
                                <motion.div key={index} whileHover={{backgroundColor : hoverColor }} className={` cursor-pointer rounded-lg p-2 `}>
                                    <Link to={`/category/${genre.toLowerCase()}`}
                                          className="w-full h-full"
                                          >
                                        <p style={{color: textColor}} className="font-semibold  text-center ">
                                            {genre}
                                        </p>
                                    </Link>

                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
                <main className=" border-t border-black-2 p-5 flex flex-row gap-2 flex-wrap max-md:justify-center">
                    {targetValue.length > 0 ? targetValue.map((item) => {
                            const {title} = item
                            const truncatedStr = title.length > 30 ? title.slice(0, 30) + "..." : title;
                            return (
                                <StoryCard key={item.id} items={item} truncatedStr={truncatedStr} searchItem={false}/>

                            )
                        }) :
                        <div className="flex flex-col w-full gap-4 justify-center items-center py-6 text-gray-600 text-sm">
                            <img src="../../public/person-sitting.png" width={200}/>
                            <p>it seems there is no result for you search ,👀</p>
                        </div>
                    }
                </main>
        </div>
    )
}
export default Category
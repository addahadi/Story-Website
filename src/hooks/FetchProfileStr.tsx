import {useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import {db} from "@/utils/firebase.tsx";




const useFetch =  (author:string) => {
    const [Data, setData] = useState<(firebase.firestore.DocumentData)[] >([]);
    useEffect(() => {
        async function ShowYourStories(){
            try {
                const Collections = await db
                    .collection("WrittenStories").get()
                Collections.forEach((collection) => {
                    const Wanted = collection.data().author == author;
                    if(!Wanted) return
                    const data = {
                        id: collection.id,
                        ...collection.data()
                    }
                    setData((prevData) => {
                        if (prevData.length == 0) {
                            return [data]
                        }
                        return [...prevData, data]
                    })
                })
            }
            catch(error){
                console.log(error)
            }
        }
        ShowYourStories()
    
    },[author]);
    return {
        Data, setData
    }
}


export default useFetch;
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import {useState , useEffect} from "react";
import {db} from "@/utils/firebase";
const useAuthor = (Data : string ) =>  {
    const [author , setAuthor] = useState<DocumentData>();
    useEffect(() => {
        async function FetchAuthor(){
            try{
                const DocField = await db.collection("user").doc(Data).get()
                const d = DocField.data();
                if(d){
                    setAuthor(d);
                }
            }
            catch (error){
                console.log(error)
            }
        }
        FetchAuthor().then(() => {});
    }, [Data]);
    return {
        author , setAuthor
    }
}
export default useAuthor
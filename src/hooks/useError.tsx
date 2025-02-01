
import { toast } from "./use-toast"
import { useState } from "react"
import { Toaster } from "@/component/ui/toaster"

const useDynamicList = () => {
    const [item , setItem] = useState<string>('')
    const [itemList , setItemList]= useState<Array<string>>([])    
    const addItem = () => {
      if (item.trim() !== "") {
        setItemList([...itemList, item.trim()]);
        setItem(""); // Clear the input
      }
    };

    return {
        item , addItem , itemList , setItem , setItemList
    }
}

const Error = () => {
  return <Toaster/>
}

export const useError = () =>  {
  
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const character = useDynamicList();
  const tag = useDynamicList();
  const [error , setError] = useState(false)
  const [ImgUrl, setImgUrl] = useState("");

  const inputs = {
    title : title,
    desc : desc,
    category : category,
    character : character.itemList[0] ,
    tag : tag.itemList[0],
    ImgUrl : ImgUrl,
  }

  const errors : Array<string> = []
  for (const key of Object.keys(inputs) as Array<keyof typeof inputs>) {
     if (!inputs[key]) {
       errors.push(key);
     }
  }
  function handleError(){
    switch (errors.length) {
      case 0:
        setError(true)
        break;
      case 1:
        toast({
          title: "Error occur",
          description: `you have not fill in ${errors[0]} `,
          variant: "destructive",
        });
        setError(false)
        break;
      default:
        toast({
          title: "Error occur",
          description: "you have not fill in the  inputs",
          variant: "destructive",
        });
        setError(false)
        break;
    }
  }

  return {
    title,
    setTitle,
    desc,
    setDesc,
    category,
    setCategory,
    tag,
    character,
    error,
    Error,
    handleError,
    ImgUrl,
    setImgUrl,
  };
}

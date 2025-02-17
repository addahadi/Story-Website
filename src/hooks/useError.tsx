
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

  const [ImgUrl, setImgUrl] = useState("");

  const inputs = {
    title : title,
    desc : desc,
    category : category,
    character : character.itemList[0] ,
    tag : tag.itemList[0],
    ImgUrl : ImgUrl,
  }

  function handleError(): boolean {
    const errors: Array<string> = [];
    for (const key of Object.keys(inputs) as Array<keyof typeof inputs>) {
      if (!inputs[key]) {
        errors.push(key);
      }
    }

    if (errors.length === 0) {

      return true;
    } else {
      toast({
        title: "Error occurred",
        description: errors.length === 1
            ? `You have not filled in ${errors[0]}`
            : "You have not filled in the required inputs",
        variant: "destructive",
      });
      return false
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
    Error,
    handleError,
    ImgUrl,
    setImgUrl,
  };
}

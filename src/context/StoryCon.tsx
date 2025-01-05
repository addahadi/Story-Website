import { StoryCon } from "@/utils/type";
import { createContext, useContext, useState } from "react";

const Story = createContext<StoryCon | undefined>(undefined)





export const StoryProvider = ({children} : {children : React.ReactNode}) => {
    const [storyId , setStoryId] = useState<string>("")
    const [partId , setPartId] = useState<string>("")
    const [isDialog, setIsDialog] = useState(false);




    return <Story.Provider value={{storyId , partId , setStoryId , setPartId , isDialog , setIsDialog}}>
        {children}
    </Story.Provider>
}



export const useStory = () => {
    const context = useContext(Story)
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
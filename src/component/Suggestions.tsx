import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import GenerateText from "@/utils/GeminiConfig";
import { useState } from "react";
import { GeneratePlotDialog } from "./Customize";

const Suggestions = ({
  selectedText,
  setSelectedText,
}: {
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const [isopen , setIsopen] = useState(false);
  const [data , setData] = useState<string[]>([]);
  async function handleClick() {
    const slcTxt = window.getSelection()?.toString()
    if(!slcTxt){
      toast({
        title:"Select Text",
        description:"You need to select a text or a paragraphe"
      })
      return 
    }
    setSelectedText(slcTxt); 
    setIsopen(true);
  }
  return (
    <div
      className=" h-[500px] max-h-[500px]
     pb-4   bg-white-1 border border-[#ccc]
    flex flex-col gap-3 w-[500px] max-w-[500px]   rounded-tl-[20px] rounded-tr-[20px] "
    >
      <div className="py-3  text-lg font-semibold w-full text-center text-black-2 ">
        History
      </div>
      <div className=" px-2 flex-1  overflow-auto flex-col gap-4">
        {data
          ? data.map((value) => {
              console.log(value);
              return (
                <div className=" bg-white-3 p-6 rounded-lg">
                  <p className=" text-black-2">{value}</p>
                </div>
              );
            })
          : "empty"}
      </div>
      <div className=" w-full px-2">
        <Button
          variant="follow"
          className=" rounded-sm w-full"
          onClick={handleClick}
        >
          Generate
        </Button>
      </div>
      <Toaster />
      <GeneratePlotDialog
        setData={setData}
        selectedText={selectedText}
        isopen={isopen}
        setIsopen={setIsopen}
      />
    </div>
  );
};

export default Suggestions
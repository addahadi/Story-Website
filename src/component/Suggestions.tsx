import { Button } from "@/component/ui/button";
import { Toaster } from "@/component/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { GeneratePlotDialog } from "./Customize";
import { Icon } from "./ui/Icon.tsx";
import cn from "classnames"
const Suggestions = ({
  selectedText,
  setSelectedText,
}: {
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const TextRef = useRef<HTMLParagraphElement>(null)
  const [isopen , setIsopen] = useState(false);
  const [data , setData] = useState<string[]>([]);
  const [isclose , setIsclose] = useState(true);
  
  
  async function handleClick() {
    const slcTxt = window.getSelection()?.toString()
    if(!slcTxt){
      toast({
        title:"Select Text",
        description:"You need to select a text or a paragraph"
      })
      return 
    }
    setSelectedText(slcTxt); 
    setIsopen(true);
  }

  
  function Delete(){
      setData([]);
  }

  function CloseOpen(){
    setIsclose(!isclose);
  }

  function CopyText(){
    const textarea = document.createElement("textarea")
    if(TextRef){
      textarea.value = TextRef.current?.textContent || "";
      document.body.appendChild(textarea);
      textarea.select()
      textarea.setSelectionRange(0, 99999);
       navigator.clipboard
         .writeText(textarea.value)
         .then(() => {
          toast({
            description: "Text copied to clipboard",
          });
         })
         .catch(() => {
            toast({
              description: "Failed to copy text:",
            });
         });

       document.body.removeChild(textarea);
    }
  }
  return (
    <div
      className={cn(" h-[500px] max-h-[500px] pb-2   bg-white-1 border border-[#ccc] flex flex-col gap-3 rounded-tl-[20px] rounded-tr-[20px]" , {
        "w-[400px] max-w-[400px]" : isclose,
        "w-fit" : !isclose
      })}
    >
      <div className="py-3  px-4  w-full flex flex-row justify-between  items-center ">
        <Icon.arrow direction={isclose ? "left" : "right"} CloseOpen={CloseOpen}/>
        {isclose ?
            <span className="text-lg font-semibold text-black-2 ">History</span> : "" }
        {isclose ?
            <div
              className=" p-2 rounded-full cursor-pointer hover:border hover:bg-orange-2 hover:border-orange-1 transition-colors"
              onClick={Delete}
            >
              <img src="../public/delete.svg" width="20px" />
            </div>
            : "" }    
      </div>
      {isclose ?
      <div
        className={cn("px-2 flex-1  overflow-auto flex flex-col gap-4",
            {" justify-center items-center": isclose}
        )}
      >
        {data.length > 0 ? data.map((value) => {
          console.log(value);
              return (
                <div className=" bg-white-3 px-4 py-3 rounded-lg flex flex-col gap-3">
                  <div className=" w-full flex flex-row justify-end">
                    <div
                      className=" p-2 rounded-full w-fit hover:bg-orange-2 hover:border hover:border-orange-1  cursor-pointer transition-colors"
                      onClick={CopyText}
                    >
                      <img src="../public/copy.svg" width="20px" />
                    </div>
                  </div>
                  <p ref={TextRef} className=" text-black-2">
                    {value}
                  </p>
                </div>
              );
            })
          : <div className=" flex flex-row gap-3 items-center">
              <img src="../public/clock.svg" width="40px" />
              <span className=" text-lg text-white-2 font-semibold" >Empty</span>
            </div>}
      </div> : "" }
      {isclose ?
      <div className=" w-full px-2">
        <Button
          variant="follow"
          className=" rounded-none  w-full"
          onClick={handleClick}
        >
          Generate
        </Button>
      </div>
      : "" }
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
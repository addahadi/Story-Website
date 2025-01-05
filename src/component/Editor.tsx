
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { useRef, useState } from "react";
import { useEffect } from "react";
import ImageTool from "@editorjs/image";
import { EditorProps } from "@/utils/type";
import { ApiController } from "@/utils/CloudConfig";


const Editor = ({setTitle,Issave,setData, setWord}: EditorProps) => {
  
  const [textData, setTextData] = useState<OutputBlockData<string, any>[]>([]);
  const EditorRef = useRef<EditorJS | null>(null);  
  useEffect(() => {
    EditorRef.current = new EditorJS({
      holder: "editorjs",
      tools: {
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: ApiController().UploadImg,
            },
          },
        },
      },

      //@ts-ignore
      data: textData,
      onChange: async () => {
        if (!EditorRef.current) return;
        const content = await EditorRef.current.save();
        setTextData(content.blocks);
        const count = countWords(content.blocks);
        setWord(count);
      },
    });
  }, []);

  const countWords = (blocks:any) => {
    let text = "";

    blocks.forEach((block:any) => {
      if (block.type === "paragraph" || block.type === "header") {
        text += block.data.text + " ";
      } else if (block.type === "list") {
        block.data.items.forEach((item:any) => {
          text += item + " "; 
        });
      }
    });

    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "").length;
  };

  
  useEffect(() => {
    async function SaveSession(){
      if(!EditorRef.current?.save()){
        return
      }
      await EditorRef.current.save().then((Data) => {
        setData(Data.blocks);

      }).catch((error) => {
        console.log(error)
      })
    }
    if(Issave){
      SaveSession()
    }
  },[Issave])
  return (
    <div>
      <textarea
      onChange={(e) => setTitle(e.target.value)}
      className="resize-none outline-none border-b-2  text-3xl w-full max-h-fit box-border pb-0 leading-none"
      placeholder="Title"

      />
      <div style={{ position: "relative" }} className=" w-full h-12">
        {/* This is where Editor.js will render */}
        <div id="editorjs" className=" mt-5 w-full h-full text-xl"></div>
      </div>

    </div>
  );
};

export default Editor
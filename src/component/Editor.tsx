import React, { useCallback, useEffect, useState } from "react";
import Quill, { Op } from "quill"
import "quill/dist/quill.snow.css";
import { EditorProps } from "@/utils/type";


const toolbarOptions = [
  [{ font: ["serif" , ""] }],
  [{ size: ["large", "huge"] }],
  [{ header: [1, 2, 3, false] }],

  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],

  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],

  ["image"],
];





const Editor = ({
  issave , setdata , setIssave , setWord
} : EditorProps) => {
  const [quill , setQuill] = useState<Quill | undefined>();



  useEffect(() => {
    if(!quill) return;
    if(!issave) return;
    const data = quill.getContents();
    setdata(data.ops);
    setIssave(false);
  },[issave])


  
  
  const WrapperRef = useCallback((wrapper : HTMLDivElement) => {
    if(wrapper == null) return 
    if(!wrapper) return 
    wrapper.innerHTML = "";

    const editor = document.createElement("div")
    editor.id = "editor"
    
    wrapper.appendChild(editor)
    const q = new Quill("#editor" , {modules : {
      toolbar : toolbarOptions
    } , theme : "snow"})
    setQuill(q);
  },[])

  useEffect(() => {
    const handler = () => {     
     const text = quill?.getText()
     if (text?.split(/\s+/)) setWord(text?.split(/\s+/).length -1);
    }

    quill?.on(Quill.events.TEXT_CHANGE,handler)
    
    return () => {
      quill?.off(Quill.events.TEXT_CHANGE, handler);
    }
  },[quill])




  return (
    <div
      id="container"
      ref={WrapperRef}
      className=" w-full bg-white-4 flex-1 min-w-0 "
    >
    </div>
  );
};

export default Editor;
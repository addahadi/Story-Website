import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill"
import "quill/dist/quill.snow.css";


const toolbarOptions = [
  [{ font: [] }],
  [{ size: ["large", "huge"] }],
  [{ header: [1, 2, 3, false] }],

  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],

  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],

  ["image"],
];





const Editor = ({
  issave , setData
} : {issave : boolean , setData : React.Dispatch<React.SetStateAction<{}>>}) => {
  const [quill , setQuill] = useState<Quill | undefined>();



  useEffect(() => {
    if(!quill) return;
    const data = quill.getContents();
    setData(data.ops);
    console.log(data.ops)
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
  return <div id="container" ref={WrapperRef} className=" w-full min-h-[500px]"></div>;
};

export default Editor;
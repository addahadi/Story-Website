
import React, { useRef } from "react";

function DynamicTextarea({
  setTitle,
}: {
  setTitle: React.Dispatch<React.SetStateAction<string | TrustedHTML>>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={adjustHeight}
      onChange={(e) => setTitle(e.target.value)}
      className=" border-b-2 border-[#ccc] outline-none   text-3xl w-full bg-white-3"
      style={{
        minHeight: "40px", 
        overflow: "hidden",
        resize: "none",       }}
      placeholder="Title..."
    />
  );
}

export default DynamicTextarea;

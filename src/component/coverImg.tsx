import { Button } from "@/components/ui/button";
import { ApiController } from "@/utils/CloudConfig";
// import { uploadImg } from "@/utils/CloudConfig";
import React, { useRef, useState} from "react";




const CoverImageUpload = ({setImgUrl} : {setImgUrl:React.Dispatch<React.SetStateAction<string>>}) => {
  const InputRef = useRef<HTMLInputElement | null>(null);
  const [img , setImg] = useState('')

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData();
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl)
      formData.append('file',file);
      const result = await ApiController().UploadImg(formData)
      setImgUrl(result.url);
    }
  };

  return (
    <div className="">
      <label htmlFor="cover-image" className="block text-lg font-semibold mb-2">
        Cover Image
      </label>
      <input
        ref={InputRef}
        type="file"
        id="cover-image"
        accept="image/*"
        className=" hidden"
        onChange={handleImageChange}
      />
      <div className=" flex gap-2 items-center border-2 w-fit p-1 rounded-lg">
        <Button className=" rounded-md bg-orange-1 text-white-1" onClick={() => InputRef.current?.click()}>Upload img</Button>
        <span className=" text-black-2 font-semibold text-lg">{img}</span>
      </div>
    </div>
  );
};

export default CoverImageUpload;

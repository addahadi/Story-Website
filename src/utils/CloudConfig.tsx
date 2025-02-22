import React from "react";
import {db} from "@/utils/FirebaseConfig.tsx";

export const ApiController = () => {
    const UploadImg = async (formData:FormData) => {
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_PRESET
        );
        try {
          const data = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
              method: "POST",
              body: formData,
           }).then((r) => r.json());
           return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    const ChangingImg = async (
        event: React.ChangeEvent<HTMLInputElement> ,
        profileId : string,
        setLoading : React.Dispatch<React.SetStateAction<boolean>> ) =>{
        const file = event.target.files?.[0]
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('file',file);
            const result =  await ApiController().UploadImg(formData)
            await db.collection("user").doc(profileId).update({
                PhotoUrl:result.url,
            })

            setLoading(false);


        }
    }
    return {
        UploadImg,
        ChangingImg
    }
}
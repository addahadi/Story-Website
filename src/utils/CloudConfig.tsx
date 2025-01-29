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
    return {
        UploadImg
    }
}
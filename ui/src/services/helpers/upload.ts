const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_NAME as string);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME as string}/upload`, {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    const url = data.url;

    return url;
};

export default uploadToCloudinary;

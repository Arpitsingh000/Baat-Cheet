

const Upload = async (file) => {
    if (!file) return

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', "images");
    data.append('cloud_name', "dzxrtr9zj");

    const res = await fetch("https://api.cloudinary.com/v1_1/dzxrtr9zj/image/upload", {
        method: "post",
        body: data
    })

    const imgData = await res.json();
    return imgData.secure_url; 
}

export default Upload;
const { default: client } = require("./client");

const MAX_SIZE_IMAGE = 1048576; // bytes
const MAX_SIZE_PROFILE_IMAGE = 3145728

const uploadFile = async (file, path) => {
  if (file.size >= MAX_SIZE_PROFILE_IMAGE) {
    return false
    // const error = new Error("Max Image Size is 1 MB");
    // return error;
  } else {

    const data = new FormData();
    data.append("file", file);
    // data.append("path", path);
    data.append("cancel", false);
    const res = await client.requestAPI({
      // endpoint: "/minio/uploadFile",
      endpoint: `/minio/uploadFile?path=${path}`,
      isAuth: false,
      method: "POST",
      data,
    });
    if(res){
      if (res.data.meta.message.includes("Success")) {
        const text = `minio/view?file=${res.data.attributes.filePath}`
        return text
      }
    }
    // else{
    //   console.log("GAGALLL")
    // }
    
  }
  const error = new Error("Failed Get File");
  return error;
};

export default uploadFile;

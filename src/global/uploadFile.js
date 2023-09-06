const { default: client } = require("./client");

const MAX_SIZE_IMAGE = 1048576; // bytes
const MAX_SIZE_PROFILE_IMAGE = 3145728

const uploadFile = async (file) => {
  if (file.size >= MAX_SIZE_PROFILE_IMAGE) {
    return false
    // console.log("HAAIIII")
    // const error = new Error("Max Image Size is 1 MB");
    // return error;
  } 
  else {
    console.log("HAAIIII LA")

    const data = new FormData();
    data.append("file", file);
    data.append("cancel", false);
    const res = await client.requestAPI({
      // endpoint: "/minio/uploadFile",
      endpoint: "/minio/imageCompany",
      isAuth: false,
      method: "POST",
      data,
    });
    console.log("ress",res)
    if(res){
      if (res.data.meta.message.includes("Success")) {
        const text = `minio/view?file=${res.data.attributes.filePath}`
        return text
      }
    }
    else{
      console.log("GAGALLL")
    }
    
  }

  
  // else if (file.size >= MAX_SIZE_PROFILE_IMAGE){
  //   console.log("HAAIIII")
    // const error = new Error("Max Image Size is 3 MB");
    // return error;
  // }
  
  // if (res?.data?.meta) {
  // }

  // if (res?.data?.meta?.message.includes("Success")) {
  //   const url = `${process?.env?.REACT_APP_SERVICE}api/v1/minio/content?content=${res.data}`;
  //   return { data: { link: url } };
  // }
  const error = new Error("Failed Get File");
  return error;
};

export default uploadFile;

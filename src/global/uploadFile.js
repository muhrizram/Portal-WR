const { default: client } = require("./client");

const MAX_SIZE_IMAGE = 1048576; // bytes
const MAX_SIZE_PROFILE_IMAGE = 3145728

const uploadFile = async (file) => {
  if (file.size >= MAX_SIZE_IMAGE) {
    const error = new Error("Max Image Size is 1 MB");
    return error;
  } else if (file.size >= MAX_SIZE_PROFILE_IMAGE){
    const error = new Error("Max Image Size is 3 MB");
    return error;
  }
  const data = new FormData();
  data.append("file", file);
  data.append("cancel", false);
  const res = await client.requestAPI({
    endpoint: "/minio/uploadFile",
    isAuth: false,
    method: "POST",
    data,
  });
  if (res.data.meta.message.includes("Success")) {
    const text = `minio/view?file=${res.data.attributes.filePath}`
    return text
  }
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

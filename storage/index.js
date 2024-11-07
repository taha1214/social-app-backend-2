const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqh5kxswb",
  api_key: "988626943728922",
  api_secret: "Y1jkWaYwDCRajYxs86AK-IVXN_k",
});

const uploadImage = (file) => {
  console.log("🚀 ~ uploadImage ~ file:", file);
  const buffer = file.buffer;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            console.log("🚀 ~ returnnewPromise ~ err:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

module.exports = { uploadImage };

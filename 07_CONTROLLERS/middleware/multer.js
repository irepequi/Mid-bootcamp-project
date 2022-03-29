const multer = require("multer");

uploadImage = () => {
  const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
      console.log(file, "ESTE ES EL CONSOLE DE FILE");

      let extension = file.originalname.split(".")[1];
      console.log(extension, "este es el console de extension");
      cb(null, Date.now() + "." + extension);
    },
  });

  const upload = multer({ storage: storage }).single("img");
  return upload;
};
module.exports = uploadImage;

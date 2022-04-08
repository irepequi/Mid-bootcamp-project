const multer = require("multer");

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: function (req, file, cb) {
      console.log(file, "ESTE ES EL CONSOLE DE FILE");

      //   originalname = gatito.png
      let extension = file.originalname.split(".")[1];
      console.log(extension, "este es el console de extension");
      cb(null, Date.now() + "." + extension);
    },
  });

  const upload = multer({ storage: storage }).single("img");
  return upload;
}
module.exports = uploadImage;

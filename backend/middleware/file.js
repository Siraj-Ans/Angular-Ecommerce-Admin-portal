const multer = require("multer");

const MIME_TYPE = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};
// const filter = (req, file, cb) => {
//   const inValid = MIME_TYPE[file.mimetype];

//   let error = new Error("invalid MIMI_TYPE");

//   if (inValid) error = null;

//   cb(error, inValid);
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/productImages");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
// const upload = multer({
//   storage: storage,
//   fileFilter: filter,
//   dest: destination,
// });

module.exports = multer({ storage: storage }).array("productImages");

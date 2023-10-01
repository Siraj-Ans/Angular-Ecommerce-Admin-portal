const multer = require("multer");

const MIME_TYPE = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};
const filter = (req, file, cb) => {
  const inValid = MIME_TYPE[file.mimetype];

  let error = new Error("invalid MIMI_TYPE");

  if (inValid) error = null;

  cb(error, inValid);
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: filter });

module.exports = upload.array("productImages");

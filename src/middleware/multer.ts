import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req._read, "dmmm", file);
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    console.log(file, "dummy:\n", req._read);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });

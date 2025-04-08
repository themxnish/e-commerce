import multer from 'multer';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';

const uploadDir = process.env.UPLOAD_DIR;

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage });
export default upload
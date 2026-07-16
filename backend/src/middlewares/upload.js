
import multer from 'multer';
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const isDocx = file.originalname.endsWith('.docx');
  if (allowed.includes(file.mimetype) || isDocx) cb(null, true);
  else cb(new Error('Only PDF or DOCX allowed'), false);
};
export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

import multer from "multer";

// Set up Multer to store files in memory
const storage = multer.memoryStorage();

export const upload = multer({ storage }); 
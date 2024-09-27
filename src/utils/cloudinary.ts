import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import ApplicationError from '../error/ApplicationError';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary directly from memory
export const uploadToCloudinary = (file: Express.Multer.File, folder: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error("Cloudinary upload error:", error); // Log the error
          return reject(new ApplicationError(500, 'Error uploading to Cloudinary'));
        }

        // Check if result is defined
        if (!result) {
          console.error("No response from Cloudinary"); // Log if no result
          return reject(new ApplicationError(500, 'No response from Cloudinary'));
        }

        return resolve(result);
      }
    );

    // Pipe the file buffer to Cloudinary
    stream.end(file.buffer);
  });
};

// Function to delete an image from Cloudinary by public ID
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err: any) {
    throw new ApplicationError(500, 'Internal server error while deleting from Cloudinary');
  }
};

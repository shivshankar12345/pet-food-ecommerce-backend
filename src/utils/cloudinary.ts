import { v2 as cloudinary } from 'cloudinary';
import ApplicationError from '../error/ApplicationError';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result;
  } catch (err: any) {
    if (err instanceof ApplicationError) {
      throw new ApplicationError(err.statusCode, err.message);
    }
    throw new ApplicationError(500, 'Internal server error while uploading to Cloudinary');
  }
};

// Function to delete an image from Cloudinary by public ID
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err: any) {
    if (err instanceof ApplicationError) {
      throw new ApplicationError(err.statusCode, err.message);
    }
    throw new ApplicationError(500, 'Internal server error while deleting from Cloudinary');
  }
};

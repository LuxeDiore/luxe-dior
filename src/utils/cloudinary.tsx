"use server";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const signature = async ({ folder }: { folder: string }) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const signature = await cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
        upload_preset,
      },
      cloudinaryConfig.api_secret!
    );
    return {
      success: true,
      signature: signature,
      timestamp: timestamp.toLocaleString(),
    };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err.message,
    };
  }
};
const cloudinaryUploader = async ({
  ele,
  location,
  type,
}: {
  ele: File;
  location: string;
  type: string;
}) => {
  const formData2 = new FormData();
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
  formData2.append("file", ele);
  formData2.append("upload_preset", "content_management_system");
  formData2.append("folder", location);
  const signatureRequest = await signature({ folder: location });
  formData2.append("signature", signatureRequest.signature!);
  formData2.append("timestamp", signatureRequest.timestamp!);
  formData2.append("api_key", api_key as string);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
    formData2
  );
  let image = {
    asset_id: data.asset_id,
    public_id: data.public_id,
    signature: data.signature,
    width: data.width,
    height: data.height,
    format: data.format,
    resource_type: data.resource_type,
    created_at: data.created_at,
    type: data.type,
    url: data.url,
    folder: data.folder,
  };
  return image;
};

export default cloudinaryUploader;

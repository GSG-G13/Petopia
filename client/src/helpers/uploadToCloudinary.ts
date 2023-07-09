import { message } from 'antd';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dorktwurf',
  },
  url: {
    secure: true,
  },
});
const uploadToCloudinary = async (file: { originFileObj: Blob; name: string | undefined; }) => {
  try {
    const formData = new FormData();
    formData.append('file', file.originFileObj, file.name);
    formData.append('upload_preset', 'kziask74');
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary.getConfig().cloud?.cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.secure_url;
  } catch (error) {
    message.error('Failed to upload file to Cloudinary.');
    throw error;
  }
};
export default uploadToCloudinary;

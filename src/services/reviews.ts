import axios from '../utils/customizeAxios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
// Generate short id
const generateShortId = () => {
  return uuidv4().replace(/-/g, '').slice(0, 12); // Xóa dấu '-' và cắt lấy 12 ký tự
};
const reviewMethods = {
  getReviewsByProduct: async (product_id: string) => {
    const result = await axios.get(`/reviews/products/${product_id}`);
    return result;
  },
  createReview: async (data: any) => {
    const result = await axios.post('/reviews', data);
    return result;
  },
  uploadImages: async (files: any) => {
    const newFiles = [...files];
    let formData = new FormData();
    if (files && Array.isArray(newFiles)) {
      // map files to new files uisng uid to change name
      const newfilesImages = newFiles.map((file) => {
        const newFileName = `${generateShortId()}.${file.name.split('.').pop()}`;
        const newFile = new File([file], newFileName, { type: file.type });
        return newFile;
      });
      for (var x = 0; x < newfilesImages.length; x++) {
        formData.append('files', newfilesImages[x]);
      }
    }
    const result = await axios.post('reviews/uploads/photos', formData);
    return result;
  },
  likeReview: async (id: string, userId: string) => {
    const result = await axios.patch(`reviews/like/${id}`, {
      userId,
    });
    return result;
  },
  unlikeReview: async (id: string, userId: string) => {
    const result = await axios.patch(`reviews/unlike/${id}`, {
      userId,
    });
    return result;
  },
};

export default reviewMethods;

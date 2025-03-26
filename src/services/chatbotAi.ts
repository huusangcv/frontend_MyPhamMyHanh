import axios from '../utils/customizeAxios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
const generateShortId = () => {
  return uuidv4().replace(/-/g, '').slice(0, 12);
};
const chatbotAiMethods = {
  createContent: async (content: string, url: string) => {
    const result = await axios.post('openaiChatbot', {
      content,
      url,
    });
    return result;
  },
  uploadImage: async (data: any) => {
    // create new file with uid
    if (data) {
      const newFileName = `${generateShortId()}.${data.name.split('.').pop()}`; // newFile and cut .path
      const newFile = new File([data], newFileName, { type: data.type });
      const formData = new FormData();
      formData.append('file', newFile, newFile.name);
      const result = await axios.post('openaiChatbot/uploads/photo', formData);
      return result;
    }
  },
};

export default chatbotAiMethods;

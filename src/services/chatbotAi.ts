import axios from '../utils/customizeAxios';
const chatbotAiMethods = {
  createContent: async (content: string) => {
    const result = await axios.post('openaiChatbox', {
      content,
    });
    return result;
  },
};

export default chatbotAiMethods;

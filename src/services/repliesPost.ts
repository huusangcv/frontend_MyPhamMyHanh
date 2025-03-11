import axios from "../utils/customizeAxios";

const replyMethods = {
  getReplies: async () => {
    const result = await axios.get(`repliesPost`);
    return result;
  },
};

export default replyMethods;

import axios from "../utils/customizeAxios";
interface PropsCreatePost {
  user_id: string;
  news_id: string;
  content: string;
}
const commentPostMethods = {
  getCommentsPost: async (newsId: string) => {
    const result = await axios.get(`commentsPost/news/${newsId}`);
    return result;
  },
  createCommentPost: async (data: PropsCreatePost) => {
    const result = await axios.post(`commentsPost`, data);
    return result;
  },
  deleteCommentPost: async (commentId: string) => {
    const result = await axios.delete(`commentsPost/${commentId}`);
    return result;
  },
};

export default commentPostMethods;

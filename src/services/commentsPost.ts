import axios from "../utils/customizeAxios";
interface PropsPost {
  user_id: string;
  news_id: string;
  content: string;
}
interface PropsPostUpdate {
  content: string;
}

interface PropsDataLike {
  userId: string;
}
const commentPostMethods = {
  getCommentsPost: async (newsId: string) => {
    const result = await axios.get(`commentsPost/news/${newsId}`);
    return result;
  },
  createCommentPost: async (data: PropsPost) => {
    const result = await axios.post(`commentsPost`, data);
    return result;
  },
  deleteCommentPost: async (commentId: string) => {
    const result = await axios.delete(`commentsPost/${commentId}`);
    return result;
  },
  updateCommentPost: async (commentId: string, data: PropsPostUpdate) => {
    const result = await axios.patch(`commentsPost/${commentId}`, data);
    return result;
  },
  likeCommentPost: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`commentsPost/like/${id}`, data);
    return result;
  },
  unlikeCommentPost: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`commentsPost/unlike/${id}`, data);
    return result;
  },
};

export default commentPostMethods;

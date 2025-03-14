import axios from "../utils/customizeAxios";
interface PropsDataPost {
  user_id: string;
  content: string;
}

interface Data {
  content: string;
}

interface PropsDataLike {
  userId: string;
}
const replyMethods = {
  getReplies: async () => {
    const result = await axios.get(`repliesPost`);
    return result;
  },
  createReplyPost: async (commentId: string, data: PropsDataPost) => {
    const result = await axios.post(`repliesPost/comment/${commentId}`, data);
    return result;
  },
  deleteReplyPost: async (commentId: string, replyId: string) => {
    const result = await axios.delete(
      `repliesPost/comment/${commentId}/${replyId}`
    );
    return result;
  },
  updateReplyPost: async (commentId: string, replyId: string, data: Data) => {
    const result = await axios.patch(
      `repliesPost/comment/${commentId}/${replyId}`,
      data
    );
    return result;
  },
  likeReplyCommentPost: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`repliesPost/like/${id}`, data);
    return result;
  },
  unlikeReplyCommentPost: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`repliesPost/unlike/${id}`, data);
    return result;
  },
};

export default replyMethods;

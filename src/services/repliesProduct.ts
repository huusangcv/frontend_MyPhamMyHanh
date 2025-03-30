import axios from '../utils/customizeAxios';
interface PropsDataProduct {
  user_id: string;
  product_id: string;
  content: string;
}

interface Data {
  content: string;
}

const replyProductMethods = {
  getRepliesByProductId: async (productId: string) => {
    const result = await axios.get(`repliesProduct/product/${productId}`);
    return result;
  },
  createReplyProduct: async (commentId: string, data: PropsDataProduct) => {
    const result = await axios.post(`repliesProduct/comment/${commentId}`, data);
    return result;
  },
  deleteReplyProduct: async (commentId: string, replyId: string) => {
    const result = await axios.delete(`repliesProduct/comment/${commentId}/${replyId}`);
    return result;
  },
  updateReplyProduct: async (commentId: string, replyId: string, data: Data) => {
    const result = await axios.patch(`repliesProduct/comment/${commentId}/${replyId}`, data);
    return result;
  },
};

export default replyProductMethods;

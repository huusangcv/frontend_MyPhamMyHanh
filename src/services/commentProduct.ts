import axios from '../utils/customizeAxios';
interface PropsProduct {
  user_id: string;
  product_id: string;
  content: string;
}
interface PropsProductUpdate {
  content: string;
}
const commentProductMethods = {
  getCommentsProduct: async (productId: string) => {
    const result = await axios.get(`commentsProduct/product/${productId}`);
    return result;
  },
  createCommentProduct: async (data: PropsProduct) => {
    const result = await axios.post(`commentsProduct`, data);
    return result;
  },
  deleteCommentProduct: async (commentId: string) => {
    const result = await axios.delete(`commentsProduct/${commentId}`);
    return result;
  },
  updateCommentProduct: async (commentId: string, data: PropsProductUpdate) => {
    const result = await axios.patch(`commentsProduct/${commentId}`, data);
    return result;
  },
};

export default commentProductMethods;

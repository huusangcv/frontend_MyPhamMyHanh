import axios from "../utils/customizeAxios";

const reviewMethods = {
  getReviewsByProduct: async (product_id: string) => {
    const result = await axios.get(`/reviews/products/${product_id}`);
    return result;
  },
};

export default reviewMethods;

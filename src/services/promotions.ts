import axios from '../utils/customizeAxios';

const promotionMethods = {
  getPromotions: async (page = 1, limit = 10) => {
    const result = await axios.get(`promotions?page=${page}&limit=${limit}`);
    return result;
  },

  getPromotionById: async (id: string) => {
    const result = await axios.get(`promotions/${id}`);
    return result;
  },

  validatePromotionCode: async (code: string) => {
    const result = await axios.post('promotions/validate', { code });
    return result;
  },
};

export default promotionMethods;

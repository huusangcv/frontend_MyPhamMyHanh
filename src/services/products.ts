import axios from "../utils/customizeAxios";

const productMethods = {
  getProducts: async (page = 1, limit = 20) => {
    const result = await axios.get(`products?page=${page}&limit=${limit}`);
    return result;
  },
  getDetailProduct: async (slug: string) => {
    const result = await axios.get(`products/slug/${slug}`);
    return result;
  },
  searchProducts: async (q: string) => {
    const result = await axios.get(`products/search?q=${q}`);
    return result;
  },
};

export default productMethods;

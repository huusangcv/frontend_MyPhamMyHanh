import axios from '../utils/customizeAxios';

const productMethods = {
  getProducts: async (page = 1, limit = 20) => {
    const result = await axios.get(`products?page=${page}&limit=${limit}`);
    return result;
  },
  getProductsByCategory: async (slug: string, page = 1, limit = 9) => {
    const result = await axios.get(`products/category/${slug}?page=${page}&limit=${limit}`);
    return result;
  },
  getDetailProduct: async (slug: string) => {
    const result = await axios.get(`products/slug/${slug}`);
    return result;
  },
  getDetailProductById: async (id: string) => {
    const result = await axios.get(`products/id/${id}`);
    return result;
  },
  searchProducts: async (q: string) => {
    const result = await axios.get(`products/search?q=${q}`);
    return result;
  },
};

export default productMethods;

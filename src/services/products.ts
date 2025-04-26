import axios from '../utils/customizeAxios';
interface PropsDataLike {
  userId: string;
}
const productMethods = {
  getProducts: async (page = 1, limit = 10) => {
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
  getProductsByfilter: async ({
    category,
    page,
    price,
    sort,
  }: {
    category: string;
    page: number;
    price: string;
    sort: string;
  }) => {
    const result = await axios.get(
      `products/filter?category=${category}&page=${page}&priceFilter=${price}&sort=${sort}`,
    );
    return result;
  },
  searchProducts: async (q: string) => {
    const result = await axios.get(`products/search?q=${q}`);
    return result;
  },
  likeProduct: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`products/like/${id}`, data);
    return result;
  },
  unlikeProduct: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`products/unlike/${id}`, data);
    return result;
  },
};

export default productMethods;

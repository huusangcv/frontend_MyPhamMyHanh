import axios from "../utils/customizeAxios";
interface PropsDataLike {
  userId: string;
}
const newsMethods = {
  getNews: async (page = 1, limit = 10) => {
    const result = await axios.get(`news?page=${page}&limit=${limit}`);
    return result;
  },
  getNewsByTag: async (slug: string, page = 1, limit = 10) => {
    const result = await axios.get(
      `news/tag/${slug}?page=${page}&limit=${limit}`
    );
    return result;
  },
  getDetailNews: async (slug: string) => {
    const result = await axios.get(`news/${slug}`);
    return result;
  },
  searchNews: async (q: string) => {
    const result = await axios.get(`news/search?q=${q}`);
    return result;
  },
  likeNews: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`news/like/${id}`, data);
    return result;
  },
  unlikeNews: async (id: string, data: PropsDataLike) => {
    const result = await axios.patch(`news/unlike/${id}`, data);
    return result;
  },
};

export default newsMethods;

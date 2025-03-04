import axios from "../utils/customizeAxios";

const newsMethods = {
  getNews: async () => {
    const result = await axios.get(`news`);
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
};

export default newsMethods;

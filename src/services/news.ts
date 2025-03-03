import axios from "../utils/customizeAxios";

const newsMethods = {
  getNews: async () => {
    const result = await axios.get(`news`);
    return result;
  },
  getDetailNews: async (id: string) => {
    const result = await axios.get(`news/${id}`);
    return result;
  },
  searchNews: async (q: string) => {
    const result = await axios.get(`news/search?q=${q}`);
    return result;
  },
};

export default newsMethods;

import axios from "../utils/customizeAxios";
const tagMethods = {
  getTags: async () => {
    const result = await axios.get("genres");
    return result;
  },
};

export default tagMethods;

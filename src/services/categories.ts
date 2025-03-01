import axios from "../utils/customizeAxios";
const categoryMethods = {
  getCategories: async () => {
    const result = await axios.get("categories");
    return result;
  },
};

export default categoryMethods;

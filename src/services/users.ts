import axios from "../utils/customizeAxios";

const usersMethods = {
  getUsers: async () => {
    const result = await axios.get(`users`);
    return result;
  },
};

export default usersMethods;

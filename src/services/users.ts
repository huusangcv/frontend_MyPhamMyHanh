import axios from "../utils/customizeAxios";

const usersMethods = {
  getUsers: async () => {
    const result = await axios.get(`users`);
    return result;
  },
  profile: async (sessionToken: string) => {
    const result = await axios.get(`/auth/user/${sessionToken}`);
    return result;
  },
  logout: async () => {
    const result = await axios.get(`/auth/user/logout`);
    return result;
  },
};

export default usersMethods;

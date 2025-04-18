import axios from '../utils/customizeAxios';

const slidesMethods = {
  getSidles: async () => {
    const result = await axios.get(`slides`);
    return result;
  },
};

export default slidesMethods;

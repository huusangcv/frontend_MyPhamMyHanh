import axios from "../utils/customizeAxios";

const segmentMethods = {
  getSegments: async () => {
    const result = await axios.get(`segments`);
    return result;
  },
};

export default segmentMethods;

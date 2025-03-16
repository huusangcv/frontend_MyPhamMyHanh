import axios from "axios";
const addressMethods = {
  getAddress: async () => {
    const result = await axios.get("https://provinces.open-api.vn/api/");
    return result;
  },
  getDistricts: async () => {
    const result = await axios.get("https://provinces.open-api.vn/api/d");
    return result;
  },
  getWards: async () => {
    const result = await axios.get("https://provinces.open-api.vn/api/w");
    return result;
  },
};

export default addressMethods;

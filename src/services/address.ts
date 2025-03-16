import axios from "axios";
const addressMethods = {
  getAddress: async () => {
    const result = await axios.get("https://provinces.open-api.vn/api/");
    return result;
  },
  getDistricts: async (provinceCode: number) => {
    const result = await axios.get(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    return result;
  },
  getWards: async (districtCode: number) => {
    const result = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    return result;
  },
};

export default addressMethods;

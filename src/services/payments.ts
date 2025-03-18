import axios from "../utils/customizeAxios";
const paymentMethods = {
  createPaymentVNPAY: async (data: { amount: number }) => {
    const result = await axios.post("/orders/create_payment_url", data);
    return result;
  },
};

export default paymentMethods;

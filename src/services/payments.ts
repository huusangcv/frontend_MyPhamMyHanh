import axios from "../utils/customizeAxios";
const paymentMethods = {
  createPaymentVNPAY: async (data: { amount: number; orderId: string }) => {
    const result = await axios.post("/orders/create_payment_url", data);
    return result;
  },
  getPaymentResult: async (queryString: string) => {
    const result = await axios.get(`/orders/vnpayment_return?${queryString}`);
    return result;
  },
};

export default paymentMethods;

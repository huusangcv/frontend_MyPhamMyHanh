import axios from "../utils/customizeAxios";
interface PropsOrder {
  user_id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  receiver: string;
  total: number;
  products: string[];
  reference: string;
  paymentMethod: string;
}
const orderMethods = {
  createOrder: async (data: PropsOrder) => {
    const result = await axios.post("orders", data);
    return result;
  },
};

export default orderMethods;

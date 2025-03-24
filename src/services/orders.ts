import axios from '../utils/customizeAxios';
interface Product {
  id: string;
  name: string;
  image: string;
  product_id: string;
  quantity: number;
  price: number;
}

interface PropsOrder {
  user_id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  receiver: string;
  total: number;
  products: Product[];
  reference: string;
  paymentMethod: string;
}
const orderMethods = {
  createOrder: async (data: PropsOrder) => {
    const result = await axios.post('orders', data);
    return result;
  },
  getOrdersByUserIid: async (user_id: string) => {
    const result = await axios.get(`orders/userId/${user_id}`);
    return result;
  },
  getDetailOrder: async (id: string) => {
    const result = await axios.get(`orders/${id}`);
    return result;
  },
};

export default orderMethods;

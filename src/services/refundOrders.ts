import axios from '../utils/customizeAxios';

const refundOrderService = {
  // Create new refund request
  createRefundOrder: async (data: {
    orderId: string;
    amount: number;
    reason: string;
    refundMethod: string;
    notes?: string;
  }) => {
    try {
      const response = await axios.post(`refunds`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get refund order by order ID
  getRefundOrderByOrderId: async (orderId: string) => {
    try {
      const response = await axios.get(`refunds/order/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get refund order by ID
  getRefundOrderById: async (id: string) => {
    try {
      const response = await axios.get(`refunds/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Process refund when approved
  processRefund: async (refundId: string) => {
    try {
      const response = await axios.post(`refunds/${refundId}/process`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get refund status
  getRefundStatus: async (refundId: string) => {
    try {
      const response = await axios.get(`refunds/${refundId}/status`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default refundOrderService;

import axios from '../utils/customizeAxios';

export interface Address {
  userId: string;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export const addressService = {
  getAllAddresses: async () => {
    const response = await axios.get(`addresses`);
    return response;
  },

  getAddressById: async (id: string) => {
    const response = await axios.get(`addresses/${id}`);
    return response;
  },

  getUserAddresses: async (userId: string) => {
    const response = await axios.get(`addresses/user/${userId}`);
    return response;
  },

  getDefaultAddress: async (userId: string) => {
    const response = await axios.get(`addresses/default/${userId}`);
    return response;
  },

  createAddress: async (addressData: Omit<Address, 'id'>) => {
    const response = await axios.post(`addresses`, addressData);
    return response;
  },

  updateAddress: async (id: string, addressData: Partial<Address>) => {
    const response = await axios.patch(`addresses/${id}`, addressData);
    return response;
  },

  setDefaultAddress: async (id: string, userId: string) => {
    const response = await axios.patch(`addresses/${id}/set-default`, { userId });
    return response;
  },

  deleteAddress: async (id: string, userId: string) => {
    const response = await axios.delete(`addresses/${id}`, { data: { userId } });
    return response;
  },
};

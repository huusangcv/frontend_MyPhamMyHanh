import axios from 'axios';
const fastDeliveryMethods = {
  getAddress: async () => {
    const result = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        token: 'b356bddb-0649-11f0-a29b-06bd18713757',
        'Content-Type': 'application/json',
      },
    });
    return result.data;
  },
  getDistricts: async (provinceId: number) => {
    const result = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        headers: {
          token: 'b356bddb-0649-11f0-a29b-06bd18713757',
          'Content-Type': 'application/json',
        },
      },
    );
    return result.data;
  },
  getWards: async (districtId: number) => {
    const result = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        headers: {
          token: 'b356bddb-0649-11f0-a29b-06bd18713757',
          'Content-Type': 'application/json',
        },
      },
    );
    return result.data;
  },
  getFee: async (dataProps: { insurance_value: number; to_district_id: number; to_ward_code: string }) => {
    const data = {
      service_type_id: 2, // 2 Hàng nhẹ | 5 Hàng nặng
      from_district_id: 1757, // Huyện Chợ Mới
      from_ward_code: '510908', // Xã Kiến An
      to_district_id: 2194,
      to_ward_code: '220714',
      length: 30,
      width: 40,
      height: 20,
      weight: 3000,
      insurance_value: 0,
      coupon: null,
    };

    const result = await axios.post(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      {
        ...data,
        insurance_value: dataProps.insurance_value,
        to_district_id: dataProps.to_district_id,
        to_ward_code: dataProps.to_ward_code,
      },
      {
        headers: {
          token: 'b356bddb-0649-11f0-a29b-06bd18713757',
          'Content-Type': 'application/json',
        },
      },
    );
    return result.data;
  },
  getLeadtime: async (dataProps: { to_district_id: number; to_ward_code: string }) => {
    const data = {
      from_district_id: 1757,
      from_ward_code: '510908',
      to_district_id: dataProps.to_district_id,
      to_ward_code: dataProps.to_ward_code,
      service_id: 53320,
    };

    const result = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime', data, {
      headers: {
        token: 'b356bddb-0649-11f0-a29b-06bd18713757',
        'Content-Type': 'application/json',
      },
    });
    return result.data;
  },
};

export default fastDeliveryMethods;

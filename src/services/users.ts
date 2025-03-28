import axios from '../utils/customizeAxios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
const generateShortId = () => {
  return uuidv4().replace(/-/g, '').slice(0, 12);
};
const usersMethods = {
  getUsers: async () => {
    const result = await axios.get(`users`);
    return result;
  },
  profile: async (sessionToken: string) => {
    const result = await axios.get(`/auth/user/${sessionToken}`);
    return result;
  },
  updateProfile: async (id: string, name: string) => {
    const result = await axios.patch(`/auth/user/${id}`, { username: name });
    return result;
  },
  logout: async () => {
    const result = await axios.get(`/auth/user/logout`);
    return result;
  },
  uploadImage: async (id: string, data: any) => {
    // create new file with uid
    if (data) {
      const newFileName = `${generateShortId()}.${data.name.split('.').pop()}`; // newFile and cut .path
      const newFile = new File([data], newFileName, { type: data.type });
      const formData = new FormData();
      formData.append('file', newFile, newFile.name);
      const result = await axios.patch(`/auth/uploadAvatar/${id}`, formData);
      return result;
    }
  },
};

export default usersMethods;

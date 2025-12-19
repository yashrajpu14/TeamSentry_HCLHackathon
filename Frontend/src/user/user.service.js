import { userApi } from "../api/user.api";

export const userService = {
  getMe: async () => await userApi.me(),

  updateMe: async ({ name, email, phone }) => {
    // send ONLY what backend understands
    return await userApi.updateMe({
      name: name?.trim(),
      email: email?.trim()?.toLowerCase(),
      phone: phone?.trim(),
    });
  },
  changePassword: async ({ currentPassword, newPassword }) => {
    return await userApi.changePassword({ currentPassword, newPassword });
  },
  async updateMeMultipart(formData) {
    const res = await userApi.updateMeMultipart(formData);
    return res.data;
  },
};

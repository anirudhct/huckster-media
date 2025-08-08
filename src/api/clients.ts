import axiosInstance from "@/lib/axiosInstance";

export const getClients = async () => {
  const res = await axiosInstance.get(`/clients?publish=true`);
  return res.data;
};

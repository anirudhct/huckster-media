import axiosInstance from "@/lib/axiosInstance";

export const getTeams = async () => {
  const res = await axiosInstance.get(`/team?publish=true`);
  return res.data;
};

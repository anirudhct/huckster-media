import axiosInstance from "@/lib/axiosInstance";

export const getSiteSettings = async () => {
  const res = await axiosInstance.get("/site-settings");
  return res.data;
};

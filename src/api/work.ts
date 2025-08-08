import axiosInstance from "@/lib/axiosInstance";

export const getWorks = async () => {
  const res = await axiosInstance.get(`/work`);
  return res.data;
};

export const getWork = async (slug: string) => {
  const res = await axiosInstance.get(`/work/${slug}`);
  return res.data;
};

export const getFeaturedWork = async () => {
  const res = await axiosInstance.get(`/work/featured`);
  return res.data;
};

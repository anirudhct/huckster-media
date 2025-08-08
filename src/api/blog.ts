import axiosInstance from "@/lib/axiosInstance";

export const getBlogs = async (page: number) => {
  const res = await axiosInstance.get(
    `/blogs?limit=10&page=${page}&publish=true`,
  );
  return res.data;
};

export const getBlog = async (slug: string) => {
  const res = await axiosInstance.get(`/blogs/${slug}`);
  return res.data;
};

export const getFeaturedBlog = async () => {
  const res = await axiosInstance.get(`/blogs/featured`);
  return res.data;
};

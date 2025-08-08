import { getBlog, getBlogs, getFeaturedBlog } from "@/api/blog";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useBlogs = (page: number = 1) => {
  return useQuery({
    queryFn: () => getBlogs(page),
    queryKey: ["blogs"],
    placeholderData: keepPreviousData,
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryFn: () => getBlog(slug),
    queryKey: ["blogs", slug],
  });
};

export const useFeaturedBlog = () => {
  return useQuery({
    queryFn: getFeaturedBlog,
    queryKey: ["blogs", "featured"],
  });
};

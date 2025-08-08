import { getFeaturedWork, getWork, getWorks } from "@/api/work";
import { useQuery } from "@tanstack/react-query";

export const useWorks = () => {
  return useQuery({
    queryFn: getWorks,
    queryKey: ["work"],
  });
};

export const useWork = (slug: string) => {
  return useQuery({
    queryFn: () => getWork(slug),
    queryKey: ["work", slug],
  });
};

export const useFeaturedWork = () => {
  return useQuery({
    queryFn: getFeaturedWork,
    queryKey: ["work", "featured"],
  });
};

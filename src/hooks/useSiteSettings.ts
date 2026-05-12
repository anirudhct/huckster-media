import { getSiteSettings } from "@/api/siteSettings";
import { useQuery } from "@tanstack/react-query";

export const useSiteSettings = () => {
  return useQuery({
    queryFn: getSiteSettings,
    queryKey: ["site-settings"],
  });
};

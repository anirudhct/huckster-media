import { getTeams } from "@/api/team";
import { useQuery } from "@tanstack/react-query";

export const useTeams = () => {
  return useQuery({
    queryFn: getTeams,
    queryKey: ["teams"],
  });
};

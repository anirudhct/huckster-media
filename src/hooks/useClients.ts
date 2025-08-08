import { getClients } from "@/api/clients";
import { useQuery } from "@tanstack/react-query";

export const useClients = () => {
  return useQuery({
    queryFn: getClients,
    queryKey: ["clients"],
  });
};

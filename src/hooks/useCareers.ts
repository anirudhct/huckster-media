import { postCareers } from "@/api/careers";
import { type TCareers } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCareers = () => {
  return useMutation({
    mutationFn: (formData: TCareers) => postCareers(formData),
    onSuccess: () => {
      toast.success("Careers form submitted successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit careers. Please try again.",
      );
    },
  });
};

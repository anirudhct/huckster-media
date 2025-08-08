import axiosInstance from "@/lib/axiosInstance";
import type { TCareers } from "@/types/api";

export const postCareers = async (formData: TCareers) => {
  const res = await axiosInstance.post("/careers-submission", formData);
  return res.data;
};

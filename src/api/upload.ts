import axios from "axios";

export const postUpload = async ({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

  const response = await axios.post(
    `${baseUrl}/upload?folder=${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

import axiosClient from "./axiosClient";

export const fetchAnonId = async (): Promise<string | null> => {
  try {
    const response = await axiosClient.get("/anon-id");
    return response.data.anon_id ?? null;
  } catch (error) {
    console.error("Error fetching anon_id:", error);
    return null;
  }
};

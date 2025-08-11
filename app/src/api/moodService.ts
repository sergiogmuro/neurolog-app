import axiosClient from "./axiosClient";

export interface MoodPayload {
  mood_id: string;
}

export const registerMood = async (payload: MoodPayload) => {
  const response = await axiosClient.post("/mood-logs", payload);
  return response.data;
};

export const getHistoryMood = async () => {
  const response = await axiosClient.get("/mood-logs");
  return response.data;
};

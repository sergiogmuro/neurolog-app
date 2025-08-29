import axiosClient from "./axiosClient";

export interface MoodPayload {
  mood_id: string;
  note?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  secondary_emotion?: string | null;
}

export const registerMood = async (payload: MoodPayload) => {
  const response = await axiosClient.post("/mood-logs", payload);
  return response.data;
};

export const getHistoryMood = async () => {
  const response = await axiosClient.get("/mood-logs");
  return response.data;
};

export const getMonthlyHistoryMood = async (month) => {
  const response = await axiosClient.get(`/mood-monthly/${month}`);
  return response.data;
};

import axiosClient from "./axiosClient";

export interface MoodPayload {
  mood: string;
}

export const registerMood = async (payload: MoodPayload) => {
  const response = await axiosClient.post("/moods", payload);
  return response.data;
};

import {fetchAnonId} from "@/api/sessionService";

const KEY_ANON_ID = 'anon_id';

export const getAnonId = () => {
  return localStorage.getItem(KEY_ANON_ID)
}

export const requestAnonId = async (): Promise<string | null> => {
  let anonId = localStorage.getItem(KEY_ANON_ID);

  if (anonId) {
    return anonId;
  }

  try {
    const response = await fetchAnonId();
    if (response) {
      localStorage.setItem(KEY_ANON_ID, response);
      return response;
    }
    return null;
  } catch (error) {
    console.error("Error fetching anonId", error);
    return null;
  }
};

import {Frown, Laugh, Meh, Smile} from "lucide-react";

export interface MoodOption {
  emoji: string;
  label: string;
  value: string;
  color: string;
}

export const moodOptions: MoodOption[] = [
  {
    emoji: <Frown size={40} strokeWidth={2} stroke={`#996ba3`} fill="yellow"/>,
    label: "Triste",
    value: "1",
  },
  {
    emoji: <Meh size={40} strokeWidth={2} stroke={`#996ba3`} fill="pink"/>,
    label: "Neutral",
    value: "2",
  },
  {
    emoji: <Smile size={40} strokeWidth={2} stroke={`#996ba3`} fill="lightblue"/>,
    label: "Bien",
    value: "3",
  },
  {
    emoji: <Smile size={40} strokeWidth={2} stroke={`#996ba3`} fill="green"/>,
    label: "Super",
    value: "4",
  },
  {
    emoji: <Laugh size={40} strokeWidth={2} stroke={`#996ba3`} fill="orange"/>,
    label: "Excelente",
    value: "5",
  },
];

export const getMoodByValue = (value: string) => {
  return moodOptions.find(mood => mood.value === value) || null;
};

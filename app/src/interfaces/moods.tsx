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
    value: "sad",
  },
  {
    emoji: <Meh size={40} strokeWidth={2} stroke={`#996ba3`} fill="pink"/>,
    label: "Neutral",
    value: "neutral",
  },
  {
    emoji: <Smile size={40} strokeWidth={2} stroke={`#996ba3`} fill="lightblue"/>,
    label: "Bien",
    value: "good",
  },
  {
    emoji: <Smile size={40} strokeWidth={2} stroke={`#996ba3`} fill="green"/>,
    label: "Super",
    value: "great",
  },
  {
    emoji: <Laugh size={40} strokeWidth={2} stroke={`#996ba3`} fill="orange"/>,
    label: "Excelente",
    value: "excellent",
  },
];

import MoodIcon from "@/components/ui/moods/MoodIcon.tsx";

export interface MoodOption {
  emoji: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

// Estados principales
export const moodOptions: MoodOption[] = [
  {
    emoji: <MoodIcon value="sad" size={40} />,
    label: "Triste",
    value: "1",
  },
  {
    emoji: <MoodIcon value="neutral" size={40} />,
    label: "Neutral",
    value: "2",
  },
  {
    emoji: <MoodIcon value="good" size={40} />,
    label: "Bien",
    value: "3",
  },
  {
    emoji: <MoodIcon value="great" size={40} />,
    label: "Super",
    value: "4",
  },
  {
    emoji: <MoodIcon value="excellent" size={40} />,
    label: "Excelente",
    value: "5",
  },
];

// Emociones secundarias
export const secondaryEmotions: MoodOption[] = [
  { emoji: <MoodIcon value="joy" size={40} />, label: "Alegría", value: "joy" },
  { emoji: <MoodIcon value="sadness" size={40} />, label: "Tristeza", value: "sadness" },
  { emoji: <MoodIcon value="anger" size={40} />, label: "Enojo", value: "anger" },
  { emoji: <MoodIcon value="fear" size={40} />, label: "Miedo", value: "fear" },
  { emoji: <MoodIcon value="surprise" size={40} />, label: "Sorpresa", value: "surprise" },
  { emoji: <MoodIcon value="calm" size={40} />, label: "Calma", value: "calm" },
];

export const getMoodByValue = (value: string) => {
  return moodOptions.find((mood) => mood.value === value) || null;
};

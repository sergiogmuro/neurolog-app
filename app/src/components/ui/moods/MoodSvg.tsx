import MoodIcon from "@/components/ui/moods/MoodIcon.tsx";

export const MoodSvg = ({ value }: { value: string }) => {
  return <MoodIcon value={value as any} size={40} />;
};

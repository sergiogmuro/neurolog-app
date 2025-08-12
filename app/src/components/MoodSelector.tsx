import {MoodSelectorComponent} from "@/components/mood/MoodSelectorComponent.tsx";

interface MoodSelector {
  setMoodId: number
}

export const MoodSelector = ({setMoodId}: MoodSelector) => {
  return (
      <div className="max-w-md mx-auto">
        <MoodSelectorComponent setMoodId={setMoodId} />
      </div>
  );
};

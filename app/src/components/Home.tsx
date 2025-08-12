import { MoodSelectorComponent} from "@/components/mood/MoodSelectorComponent.tsx";

interface MoodSelector {
  setMoodId: number
}

export const Home = ({setMoodId}: MoodSelector) => {
  return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div
              className='w-20 h-20 mx-auto mb-2 bg-gradient-to-br  rounded-2xl flex items-center justify-center shadow-2xl'>
            <img src='./neuro-logo.png'/>
          </div>
          <h3 className="text-1xl font-bold text-white mb-2">NeuroLog</h3>
        </div>

        <MoodSelectorComponent setMoodId={setMoodId} />
      </div>
  );
};

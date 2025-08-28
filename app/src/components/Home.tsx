import { MoodSelectorComponent } from "@/components/mood/MoodSelectorComponent.tsx";

interface HomeProps {
  setMoodId: number;
}

export const Home = ({ setMoodId }: HomeProps) => {
  const handleSkip = () => {
    setMoodId(3); // valor por defecto al omitir
    console.log("📝 Usuario omitió mood");
  };

  return (
      <div className="max-w-md mx-auto relative ">
        {/* Botón flotante arriba a la derecha */}
        <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-sm text-orange-200 underline hover:text-orange-300"
        >
          Omitir
        </button>

        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-2xl">
            <img src="./neuro-logo.png" />
          </div>
          <h3 className="text-1xl font-bold text-white mb-2">NeuroLog</h3>
        </div>

        {/* Selector de mood */}
        <MoodSelectorComponent setMoodId={setMoodId} />
      </div>
  );
};

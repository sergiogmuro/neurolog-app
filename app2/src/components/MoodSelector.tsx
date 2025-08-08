import {Button} from "@/components/ui/button";
import {Meh, Frown, Smile, Laugh} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
  color: string;
}

const moodOptions: MoodOption[] = [
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

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  selectedMood: string | null;
}

export const MoodSelector = ({onMoodSelect, selectedMood}: MoodSelectorProps) => {
  return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div
              className='w-20 h-20 mx-auto mb-2 bg-gradient-to-br  rounded-2xl flex items-center justify-center shadow-2xl'>
            {/*<Brain size={40} className="text-white"/>*/}
            <img src='./neuro-logo.png'/>
          </div>
          <h3 className="text-1xl font-bold text-white mb-2">NeuroLog</h3>
        </div>

        <Card className="bg-transparent border-0 w-full text-center">
          <h2 className="text-5xl font-semibold text-foreground mb-8 text-left">
            <span className={`text-orange-200`}>¿Cómo te</span> sientes ahora?
          </h2>

          <div className="flex justify-center gap-6 mb-6">
            {moodOptions.map((mood) => (
                <button
                    key={mood.value}
                    onClick={() => onMoodSelect(mood.value)}
                    className={`relative flex flex-col items-center group transition-all duration-300 ${
                        selectedMood === mood.value ? 'scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={mood.label}
                >
                  <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                          selectedMood === mood.value
                              ? 'ring-4 ring-white/40 shadow-xl'
                              : 'group-hover:shadow-xl'
                      }`}
                      style={{width: 'fit-content', height: 'fit-content'/*, flexBasis: "fit-content"*/}}
                  >
                    <span className="text-4xl">{mood.emoji}</span>
                  </div>
                  <span className="text-sm">{mood.label}</span>
                </button>
            ))}
          </div>

          <Button
              size="lg"
              className="register-button text-primary-foreground"
              style={{fontSize: '1.5em', height: 'auto'}}
              disabled={!selectedMood}
          >
            Registrar
          </Button>
        </Card>
      </div>
  );
};

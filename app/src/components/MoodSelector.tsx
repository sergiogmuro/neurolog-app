import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card.tsx";
import {moodOptions} from "@/interfaces/moods.tsx";
import {useState} from "react";
import {registerMood} from "@/api/moodService.ts";

interface MoodSelector {
  setMoodId: number
}

export const MoodSelector = ({setMoodId}: MoodSelector) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!selectedMood) return;

    try {
      setLoading(true);
      const result = await registerMood({mood_id: selectedMood});
      console.log("✅ Emoción registrada:", result);

      setMoodId(result?.mood_id ?? 0)
      // Aquí puedes mostrar un toast o feedback visual
    } catch (error) {
      console.error("❌ Error al registrar emoción", error);
    } finally {
      setLoading(false);
    }

    // 🔊 Reproducir sonido
    const audio = new Audio("/assets/sounds/audio_fad29823bb.mp3"); // ruta pública en tu proyecto
    audio.play().catch((err) => console.error("Error reproduciendo audio:", err));
  };

  return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div
              className='w-20 h-20 mx-auto mb-2 bg-gradient-to-br  rounded-2xl flex items-center justify-center shadow-2xl'>
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
                    onClick={() => setSelectedMood(mood.value)}
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
              className="register-button text-primary-foreground button-primary"
              disabled={!selectedMood}
              onClick={handleRegister}
          >
            Registrar
          </Button>
        </Card>
      </div>
  );
};

import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card.tsx";
import {moodOptions, secondaryEmotions} from "@/interfaces/moods.tsx";
import {useEffect, useState} from "react";
import {registerMood} from "@/api/moodService.ts";
import {useLocation} from "@/hooks/useLocation.ts";

interface MoodSelectorComponent {
  setMoodId: (id: number) => void;
}

export const MoodSelectorComponent = ({setMoodId}: MoodSelectorComponent) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showSecondarySelection, setShowSecondarySelection] = useState(false);
  const [selectedSecondaryEmotion, setSelectedSecondaryEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>("");

  const { coords, getLocation } = useLocation();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const handlePrimaryMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setSelectedSecondaryEmotion(null);
    setShowSecondarySelection(true);
  };

  const handleRegister = async (withSecondaryEmotion: boolean = true) => {
    if (!selectedMood) return;

    try {
      setLoading(true);
      const result = await registerMood({
        mood_id: selectedMood,
        note: note.trim() || null,
        latitude: coords.latitude || null,
        longitude: coords.longitude || null,
        secondary_emotion: withSecondaryEmotion ? selectedSecondaryEmotion : null
      });
      console.log("✅ Emoción registrada:", result);

      setMoodId(result?.mood_id ?? 0);
    } catch (error) {
      console.error("❌ Error al registrar emoción", error);
    } finally {
      setLoading(false);
    }

    // 🔊 sonido
    const audio = new Audio("/assets/sounds/chime-effect.mp3");
    audio.play().catch((err) => console.error("Error reproduciendo audio:", err));
  };

  const handleSkipSecondary = () => {
    handleRegister(false);
  };

  const handleBackToPrimary = () => {
    setShowSecondarySelection(false);
    setSelectedSecondaryEmotion(null);
  };

  if (showSecondarySelection) {
    return (
        <Card className="bg-transparent border-0 w-full text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-2 text-left">
            <span className="text-orange-200">¿Quieres precisar</span> tu emoción?
          </h2>
          <p className="text-sm text-muted-foreground mb-8 text-left">
            Esto nos ayudará a entender mejor tu bienestar.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {secondaryEmotions.map((emotion) => (
                <button
                    key={emotion.value}
                    onClick={() => setSelectedSecondaryEmotion(emotion.value)}
                    className={`relative flex flex-col items-center group transition-all duration-300 p-3 ${
                        selectedSecondaryEmotion === emotion.value ? 'scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={emotion.label}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-lg transition-all duration-300 ${
                      selectedSecondaryEmotion === emotion.value
                          ? 'ring-4 ring-orange-200/40 shadow-xl'
                          : 'group-hover:shadow-xl group-hover:animate-pulse'
                  }`}>
                    <span className="text-4xl">{emotion.emoji}</span>
                  </div>
                  <span className="text-sm text-foreground text-center leading-tight font-medium">
                {emotion.label}
              </span>
                </button>
            ))}
          </div>

          <textarea
              placeholder="Escribe una nota (opcional)"
              className="w-full p-3 mb-6 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-orange-200"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
          />

          <div className="space-y-3">
            <Button
                size="lg"
                className="w-full register-button text-primary-foreground button-primary"
                disabled={!selectedSecondaryEmotion || loading}
                onClick={() => handleRegister(true)}
            >
              {loading ? "Registrando..." : "Registrar emoción"}
            </Button>

            <button
                onClick={handleSkipSecondary}
                disabled={loading}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Omitir
            </button>
          </div>
        </Card>
    );
  }

  return (
      <Card className="bg-transparent border-0 w-full text-center">
        <h2 className="text-5xl font-semibold text-foreground mb-8 text-left">
          <span className={`text-orange-200`}>¿Cómo te</span> sientes ahora?
        </h2>

        <div className="flex justify-center gap-6 mb-6">
          {moodOptions.map((mood) => (
              <button
                  key={mood.value}
                  onClick={() => handlePrimaryMoodSelect(mood.value)}
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
                    style={{width: 'fit-content', height: 'fit-content'}}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                </div>
                <span className="text-sm">{mood.label}</span>
              </button>
          ))}
        </div>

        <textarea
            placeholder="Escribe una nota (opcional)"
            className="w-full p-3 mb-6 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-orange-200"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />

        <Button
            size="lg"
            className="register-button text-primary-foreground button-primary"
            disabled={!selectedMood || loading}
            onClick={() => selectedMood && handlePrimaryMoodSelect(selectedMood)}
        >
          {loading ? "Procesando..." : "Continuar"}
        </Button>
      </Card>
  );
};

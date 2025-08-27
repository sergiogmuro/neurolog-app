import {useState, useRef, useEffect} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Play, Pause, Music, Volume2, AlertCircle} from "lucide-react";
import {MusicPlayer} from "@/components/relief/MusicPlayer.tsx";

interface ReliefProps {
}

export const Relief = ({}: ReliefProps) => {
  const [showPlaylist, setShowPlaylist] = useState(false);

  const startMusicTherapy = () => {
    setShowPlaylist(true);
  };

  return (
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Desahogarse</h1>
          <p className="text-muted-foreground text-sm">
            Tómate un momento para ti. Para calmar cualquier momento o inquietud cuando lo necesites.
          </p>
        </div>

        {!showPlaylist ? (
            <div className="space-y-6">
              {/* Mensaje de bienvenida */}
              <Card className="glass-card rounded-2xl p-6 text-center">
                <div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Music className="text-white" size={24}/>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Respira y Relájate
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Tómate un momento para ti. La música puede ayudarte a procesar tus emociones y encontrar paz interior.
                </p>

                {/* Botón rojo redondo */}
                <Button
                    onClick={startMusicTherapy}
                    className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    size="icon"
                >
                  <Play className="h-8 w-8 ml-1"/>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Presiona para comenzar tu terapia musical
                </p>
              </Card>

              {/* Consejos de respiración */}
              <Card className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Ejercicio de Respiración
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Inhala profundamente por 4 segundos</p>
                  <p>• Mantén el aire por 4 segundos</p>
                  <p>• Exhala lentamente por 6 segundos</p>
                  <p>• Repite este ciclo 5 veces</p>
                </div>
              </Card>
            </div>
        ) : (
            <MusicPlayer/>
        )}
      </div>
  );
};

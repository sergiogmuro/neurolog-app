import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Music, Volume2 } from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
}

const relaxingSongs: Song[] = [
  {
    id: 1,
    title: "Lluvia Suave",
    artist: "Sonidos de la Naturaleza",
    duration: "10:00",
    url: "/assets/relief/heavy-doom-metal-instrumental-288971.mp3"
  },
  {
    id: 2,
    title: "Meditación Profunda",
    artist: "Paz Interior",
    duration: "8:30",
    url: "/assets/relief/heavy-drag-mid-tempo-nu-metal-instrumental-379674.mp3"
  },
  {
    id: 3,
    title: "Respiración Consciente",
    artist: "Mindfulness",
    duration: "12:15",
    url: "/placeholder-audio.mp3"
  },
  {
    id: 4,
    title: "Ondas del Océano",
    artist: "Relajación Total",
    duration: "15:00",
    url: "/placeholder-audio.mp3"
  },
  {
    id: 5,
    title: "Viento en el Bosque",
    artist: "Naturaleza Pura",
    duration: "9:45",
    url: "/placeholder-audio.mp3"
  }
];

interface DesahogoProps {
  onBack: () => void;
}

export const Relief = ({ onBack }: DesahogoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(false);
    // setShowPlaylist(false);
  };

  const startMusicTherapy = () => {
    setShowPlaylist(true);
  };

  return (
      <div className="cosmic-bg min-h-screen pt-16 pb-24 px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="mr-4 rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Momento de Desahogo</h1>
          </div>

          {!showPlaylist ? (
              <div className="space-y-6">
                {/* Mensaje de bienvenida */}
                <Card className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Music className="text-white" size={24} />
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
                    <Play className="h-8 w-8 ml-1" />
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
              <div className="space-y-6">
                {/* Reproductor actual */}
                {currentSong && (
                    <Card className="glass-card rounded-2xl p-6">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                          <Volume2 className="text-white" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{currentSong.title}</h3>
                        <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
                      </div>

                      <div className="flex justify-center mb-4">
                        <Button
                            onClick={handlePlayPause}
                            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                            size="icon"
                        >
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                        </Button>
                      </div>

                      <audio
                          ref={audioRef}
                          src={currentSong.url}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          loop
                      />
                    </Card>
                )}

                {/* Lista de canciones */}
                <Card className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Música para Desahogarse
                  </h3>
                  <div className="space-y-3">
                    {relaxingSongs.map((song) => (
                        <div
                            key={song.id}
                            onClick={() => selectSong(song)}
                            className={`p-3 rounded-xl cursor-pointer transition-colors ${
                                currentSong?.id === song.id
                                    ? 'bg-primary/20 border border-primary/30'
                                    : 'bg-muted/20 hover:bg-muted/40'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground">{song.title}</h4>
                              <p className="text-xs text-muted-foreground">{song.artist}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{song.duration}</span>
                              {currentSong?.id === song.id && isPlaying ? (
                                  <Pause className="h-4 w-4 text-primary" />
                              ) : (
                                  <Play className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </Card>
              </div>
          )}
        </div>
      </div>
  );
};

import {useState, useRef, useEffect} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useToast} from "@/hooks/use-toast";
import {ArrowLeft, Play, Pause, Music, Volume2, AlertCircle, Brain} from "lucide-react";

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
    duration: "1:49",
    url: "/assets/relief/calming-rain.mp3"
  },
  {
    id: 2,
    title: "Meditación Profunda",
    artist: "Paz Interior",
    duration: "1:37",
    url: "/assets/relief/meditation-deep.mp3"
  },
  {
    id: 3,
    title: "Respiración Consciente",
    artist: "Mindfulness",
    duration: "1:41",
    url: "/assets/relief/mindfulness.mp3"
  },
  {
    id: 4,
    title: "Ondas del Océano",
    artist: "Relajación Total",
    duration: "1:15",
    url: "/assets/relief/ocean-waves.mp3"
  },
  {
    id: 5,
    title: "Viento en el Bosque",
    artist: "Naturaleza Pura",
    duration: "2:07",
    url: "/assets/relief/wind.mp3"
  },
  {
    id: 6,
    title: "Descarga Rock",
    artist: "Heavy metal instrumental",
    duration: "3:03",
    url: "/assets/relief/heavy-doom-metal-instrumental-288971.mp3"
  },
  {
    id: 7,
    title: "Heavy Rock ",
    artist: "Heavy metal rock instrumental mid tempo",
    duration: "4:02",
    url: "/assets/relief/heavy-drag-mid-tempo-nu-metal-instrumental-379674.mp3"
  },

];

const inspirationalPhrases = [
  "Respira profundamente y encuentra tu paz interior",
  "Cada momento es una nueva oportunidad para sanar",
  "Eres más fuerte de lo que crees",
  "La calma existe dentro de ti, solo tienes que encontrarla",
  "Permite que la música guíe tu corazón hacia la serenidad",
  "Este momento es tuyo, disfrútalo plenamente",
  "La sanación comienza con la aceptación",
  "Confía en el proceso de tu crecimiento personal",
  "Eres merecedor de amor y compasión",
  "La paz está a solo una respiración de distancia",
  "Suelta lo que no puedes controlar y fluye con la vida",
  "Cada inhalación trae energía, cada exhalación libera tensión",
  "Tu mente es un jardín: elige plantar pensamientos positivos",
  "Agradece cada pequeño momento de alegría",
  "Permítete sentir sin juzgar lo que surge",
  "La serenidad comienza en el silencio interior",
  "Confía en que cada experiencia te guía hacia tu crecimiento",
  "Abraza tu presente y deja atrás las preocupaciones",
  "Tu respiración es tu ancla en el momento presente",
  "Cree en tu capacidad de transformar la calma en acción",
  "Respirar conscientemente puede reducir la presión arterial y el ritmo cardíaco",
  "10 minutos de relajación profunda al día disminuyen los niveles de cortisol, la hormona del estrés",
  "La meditación regular mejora la concentración y la memoria",
  "El simple acto de inhalar lentamente oxigena tu cuerpo y despeja tu mente",
  "Escuchar música relajante puede mejorar el sueño y reducir la ansiedad",
  "Practicar mindfulness fortalece la resiliencia emocional y la empatía",
  "Liberar tensión muscular durante la respiración profunda aumenta tu energía",
  "Tomarte un momento para ti mejora tu bienestar físico y mental",
  "La relajación activa el sistema nervioso parasimpático, que promueve la recuperación y calma",
  "Sonreír, aunque sea conscientemente, reduce el estrés y libera endorfinas",
  "Dedicar tiempo a la calma mejora tu creatividad y claridad mental",
  "La respiración diafragmática aumenta la oxigenación y mejora la digestión",
  "La práctica de la gratitud durante la relajación eleva tu estado de ánimo",
  "El autocuidado diario disminuye la irritabilidad y mejora la paciencia",
  "Tomar pausas conscientes entre tareas reduce errores y mejora el rendimiento",
  "Escuchar sonidos de la naturaleza reduce la tensión y mejora la sensación de bienestar",
  "Integrar pequeños momentos de calma fortalece tu sistema inmunológico",
  "La relajación guiada ayuda a procesar emociones y superar bloqueos",
  "Respirar lentamente antes de tomar decisiones importantes aumenta la claridad mental",
  "Practicar respiración profunda y consciente puede disminuir los síntomas de ansiedad"
];

interface MusicSelectorProps {
}

export const MusicPlayer = ({}: MusicSelectorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const {toast} = useToast();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [playOnSelect, setPlayOnSelect] = useState(false);

  // Cambiar frases cada 8 segundos cuando se reproduce música
  useEffect(() => {
    if (!isPlaying || !currentSong) return;

    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % inspirationalPhrases.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

// Agregar/quitar clase de fondo en <body> mientras se reproduce
  useEffect(() => {
    if (isPlaying && currentSong) {
      document.body.classList.add("music-ambient");
    } else {
      document.body.classList.remove("music-ambient");
    }

    return () => {
      document.body.classList.remove("music-ambient");
    };
  }, [isPlaying, currentSong]);

// Play / Pause manual
  const handlePlayPause = async () => {
    if (!currentSong || !audioRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        // toast({
        //   title: "Reproduciendo",
        //   description: `${currentSong.title} - ${currentSong.artist}`,
        //   duration: 3000,
        // });
      }
    } catch (err) {
      setError("Error al reproducir el audio");
      toast({
        title: "Error",
        description: "No se pudo reproducir la canción",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

// Selección de canción → siempre inicia reproducción automática
  const selectSong = (song: Song) => {
    if (song.id === currentSong?.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setError(null);
      setPlayOnSelect(true);
    }
  };

// Reproducir automáticamente al seleccionar nueva canción
  useEffect(() => {
    if (!currentSong || !playOnSelect || !audioRef.current) return;

    const start = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await audioRef.current.play();

        // toast({
        //   title: "Reproduciendo",
        //   description: `${currentSong.title} - ${currentSong.artist}`,
        // });
      } catch (err) {
        setError("Error al reproducir el audio");
        toast({
          title: "Error",
          description: "No se pudo reproducir la canción",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setPlayOnSelect(false);
      }
    };

    start();
  }, [currentSong, playOnSelect]);

  return (
      <div className="space-y-6">
        {/* Reproductor actual */}
        {currentSong && (
            <Card
                className={`glass-card border-0 rounded-none p-6 relative overflow-hidden playing-ambient  ${isPlaying ? ' active' : ''}`}>
              {/* Efectos de luces relajantes */}
              {isPlaying && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="relaxing-lights-1"></div>
                    <div className="relaxing-lights-2"></div>
                    <div className="relaxing-lights-3"></div>
                  </div>
              )}

              <div className="relative z-10 music-ambient-wrapper pt-12">
                <div className="text-center mb-6">
                  <div
                      className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center transition-all duration-1000 ${isPlaying ? 'animate-slow-pulse shadow-lg shadow-indigo-400/50' : ''}`}>
                    <Brain className="text-white" size={44}/>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{currentSong.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
                </div>

                {/* Frase inspiracional */}
                {isPlaying && (
                    <div className="text-center mb-6 min-h-[60px] flex items-center justify-center">
                      <p
                          key={currentPhrase} // <-- fuerza re-mount y reinicia la animación
                          className="text-2xl text-foreground/80 italic leading-relaxed px-4 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm phrase-animation">
                        {inspirationalPhrases[currentPhrase]}
                      </p>
                    </div>
                )}

                {error && (
                    <Alert className="mb-4">
                      <AlertCircle className="h-4 w-4"/>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-center mb-4">
                  <Button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      className={`w-8/12 h-16 rounded-full bg-primary bg-amber-600 hover:bg-primary/90 disabled:opacity-50 transition-all duration-300 ${isPlaying ? 'shadow-lg shadow-primary/50' : ''}`}
                      size="icon"
                  >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    ) : isPlaying ? (
                        <Pause className="h-6 w-4"/>
                    ) : (
                        <Play className="h-6 w-6 ml-1"/>
                    )}
                  </Button>
                </div>

                <audio
                    ref={audioRef}
                    src={currentSong.url}
                    onPlay={() => {
                      setTimeout(() => {
                        setIsPlaying(true)
                      }, 200)
                    }}
                    onPause={() => setIsPlaying(false)}
                    loop
                />
              </div>
            </Card>
        )}

        {/* Lista de canciones */}
        <Card className={`glass-card rounded-2xl p-6`}>
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
                          <Pause className="h-4 w-4 text-primary"/>
                      ) : (
                          <Play className="h-4 w-4 text-muted-foreground"/>
                      )}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </Card>
      </div>

  );
};

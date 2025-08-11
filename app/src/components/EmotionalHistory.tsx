import {Card} from "@/components/ui/card";
import {TrendingUp, Calendar, Clock} from "lucide-react";
import {useEffect, useState} from "react";
import {getHistoryMood} from "@/api/moodService.ts";
import {format, isToday, isYesterday, differenceInCalendarDays, parseISO} from "date-fns";
import {getMoodByValue} from "@/interfaces/moods.tsx";

/*

const mockHistoryData = [
  {date: "Hoy", time: "14:30", mood: "😊", label: "Bien", color: "bg-green-500"},
  {date: "Hoy", time: "09:15", mood: "😄", label: "Muy Bien", color: "bg-yellow-500"},
  {date: "Ayer", time: "18:45", mood: "😐", label: "Neutral", color: "bg-gray-500"},
  {date: "Ayer", time: "12:20", mood: "😊", label: "Bien", color: "bg-green-500"},
  {date: "2 días", time: "16:30", mood: "🤩", label: "Excelente", color: "bg-orange-500"},
];
*/

function formatMoodDateTime(isoDate: string) {
  const dateObj = parseISO(isoDate);
  let dateLabel = "";
  const now = new Date();

  if (isToday(dateObj)) {
    dateLabel = "Hoy";
  } else if (isYesterday(dateObj)) {
    dateLabel = "Ayer";
  } else {
    const daysAgo = differenceInCalendarDays(now, dateObj);
    dateLabel = `${daysAgo} días`;
  }

  const timeLabel = format(dateObj, "HH:mm"); // formato 24 horas, ej: 14:30

  return {dateLabel, timeLabel};
}

export const EmotionalHistory = () => {
  const [moodHistoryData, setMoodHistoryData] = useState<any>(undefined);

  useEffect(() => {
    if (!moodHistoryData) {
      getHistoryMood().then(response => {
        const data = response.map(mood => {
          const {dateLabel, timeLabel} = formatMoodDateTime(mood.created_at);

          let color = "bg-gray-500";
          switch (mood?.name?.toLowerCase()) {
            case "1":
              color = "bg-green-500";
              break;
            case "2":
              color = "bg-yellow-500";
              break;
            case "3":
              color = "bg-gray-500";
              break;
            case "4":
              color = "bg-orange-500";
              break;
            default:
              color = "bg-gray-400";
          }

          return {
            mood: getMoodByValue(mood.mood_id.toString()).emoji,
            date: dateLabel,
            time: timeLabel,
            label: mood.mood.name,
            color,
          };
        });
        setMoodHistoryData(data);
      });
    }
  }, []);

  return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Historial emocional</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Aquí puedes revisar tu evolución emocional a lo largo del tiempo y identificar patrones en tu bienestar.
          </p>
        </div>

        {/* Stats Card */}
        <Card className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Esta semana</h3>
            <TrendingUp className="text-accent" size={20}/>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">4.2</div>
              <div className="text-xs text-muted-foreground">Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">12</div>
              <div className="text-xs text-muted-foreground">Registros</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">↗</div>
              <div className="text-xs text-muted-foreground">Tendencia</div>
            </div>
          </div>
        </Card>

        {/* History List */}
        <div className="space-y-3">
          {moodHistoryData && moodHistoryData.map(function (entry, index) {
            return (
                <Card key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${entry.color}/20`}>
                      <span className="text-2xl">{entry.mood}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar size={14} className="text-muted-foreground"/>
                        <span className="text-sm text-foreground font-medium">{entry.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-muted-foreground"/>
                        <span className="text-sm text-muted-foreground">{entry.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{entry.label}</div>
                    </div>
                  </div>
                </Card>
            )
          })}
        </div>
      </div>
  );
};

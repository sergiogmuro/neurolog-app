import {Card} from "@/components/ui/card";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState} from "react";
import {getMonthlyHistoryMood} from "@/api/moodService.ts";

const moodEmojis: Record<number, string> = {
  0: "😔",   // triste
  1: "😐",   // neutral
  2: "😊",   // bien
  3: "😄",   // muy bien
  4: "🤩"    // excelente
};

interface CalendarDay {
  day: number | null;
  mood?: string | null;
}

export const MoodCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);

  const getDaysInMonth = (date: Date, moods?: Record<string, string>) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const calendar: CalendarDay[] = [];

    // empty slots before start of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push({ day: null });
    }

    // actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      calendar.push({day, mood: moods ? moods[dateString] : null});
    }

    return calendar;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(direction === "prev" ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newDate;
    });
  };

  useEffect(() => {
    if (!currentDate) return;

    setDays(getDaysInMonth(currentDate));

    getMonthlyHistoryMood(currentDate.getMonth() + 1).then((r) => {
      const moods: Record<string, number> = {};
      r?.history_week?.forEach((i: any) => {
        moods[i.day] = Math.round(Number(i.avg_mood));
      });

     setDays(getDaysInMonth(currentDate, moods));
    });
  }, [currentDate]);

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendario emocional</h1>
          <p className="text-muted-foreground text-sm">
            Visualiza tu estado de ánimo a lo largo del mes
          </p>
        </div>

        <Card className="glass-card rounded-2xl p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <ChevronLeft size={20} className="text-foreground"/>
            </button>
            <h2 className="text-lg font-semibold text-foreground capitalize">
              {getMonthName(currentDate)}
            </h2>
            <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <ChevronRight size={20} className="text-foreground"/>
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
                <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                  {day}
                </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayObj, index) => (
                <div key={index} className="aspect-square flex items-center justify-center relative">
                  {dayObj.day && (
                      <div
                          className="w-full h-full flex flex-col items-center justify-center rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                        <span className="text-sm text-foreground font-medium mb-1">{dayObj.day}</span>
                        {dayObj.mood !== null && (
                            <span className="text-xs h-1">{moodEmojis[dayObj.mood]}</span>
                        )}
                      </div>
                  )}
                </div>
            ))}
          </div>
        </Card>

        {/* Legend */}
        <Card className="glass-card rounded-2xl p-4 mt-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Leyenda</h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">😔</span>
              <span className="text-xs text-muted-foreground">Triste</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">😐</span>
              <span className="text-xs text-muted-foreground">Neutral</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">😊</span>
              <span className="text-xs text-muted-foreground">Bien</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">😄</span>
              <span className="text-xs text-muted-foreground">Muy Bien</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">🤩</span>
              <span className="text-xs text-muted-foreground">Excelente</span>
            </div>
          </div>
        </Card>
      </div>
  );
};

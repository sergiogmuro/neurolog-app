import {Card} from "@/components/ui/card";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface HistoryChartProps {
  data: { day: string; avg_mood: number }[];
}

const moodEmojis: Record<number, string> = {
  0: "😶",
  1: "😢",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😊",
};

export const HistoryChart = ({data}: HistoryChartProps) => {
  const chartData = data.map(d => ({
    ...d,
    label: format(parseISO(d.day), "EEE", { locale: es })
        .charAt(0)
        .toUpperCase(), // primer letra
    emoji: moodEmojis[Math.round(Number(d.avg_mood))] || "😶"
  }));

  return (
      <Card className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Últimos 7 días</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-20"/>
              <XAxis dataKey="label" tick={{fill: "#fff"}}/>
              <YAxis hide domain={[0, 5]}/>
              <Tooltip formatter={(value: any) => `Promedio: ${value}`}/>
              <Line
                  type="monotone"
                  dataKey="avg_mood"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={({cx, cy, payload}) => (
                      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={22}>
                        {payload.emoji}
                      </text>
                  )}
                  activeDot={{r: 6}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
  );
};

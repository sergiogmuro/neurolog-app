<?php

namespace App\Repositories;

use App\Models\MoodLog;
use Carbon\Carbon;

class MoodLogsRepository
{
    public function getHistorical($userId, $from, $to)
    {
        return MoodLog::with('mood')
            ->where('user_id', $userId)
            ->whereBetween('created_at', [$from, $to])
            ->latest()
            ->get();
    }

    public function getAvgDayByDay(int $userId, Carbon $from, Carbon $to, bool $fillNullDays = true)
    {
        $historyWeekRaw = MoodLog::selectRaw('DATE(created_at) as day, AVG(mood_id) as avg_mood')
            ->where('user_id', $userId)
            ->whereBetween('created_at', [$from, $to])
            ->groupBy('day')
            ->orderBy('day', 'asc')
            ->get()
            ->keyBy('day'); // clave = fecha

        $days = [];
        $current = $from->copy();
        while ($current <= $to) {
            $dayStr = $current->toDateString();
            if (!$fillNullDays && empty($historyWeekRaw[$dayStr])) {
                $current->addDay();
                continue;
            }
            $days[] = [
                'day' => $dayStr,
                'avg_mood' => $historyWeekRaw[$dayStr]->avg_mood ?? 0
            ];
            $current->addDay();
        }

        return $days;
    }
}

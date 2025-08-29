<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoodLog;
use App\Repositories\MoodLogsRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MoodLogController extends Controller
{
    const HISTORY_DAYS_AGO = 7;

    private MoodLogsRepository $moodRepository;

    public function __construct(MoodLogsRepository $moodRepository)
    {
        $this->moodRepository = $moodRepository;
    }

    public function index(Request $request)
    {
        $userId = 1; // $request->user()->id
        $from = Carbon::now()->subDays(self::HISTORY_DAYS_AGO - 1)->startOfDay();
        $to = Carbon::now()->endOfDay();

        $moods = $this->moodRepository->getHistorical($userId, $from, $to);

        $from = Carbon::now()->startOfWeek()->startOfDay();
        $to = Carbon::now()->startOfWeek()->endOfWeek()->endOfDay();

        $days = $this->moodRepository->getAvgDayByDay($userId, $from, $to);

        $excellentDays = collect($days)->filter(fn($avg) => $avg['avg_mood'] >= 4)->count();
        $lowMoodDays = collect($days)->filter(fn($avg) => $avg['avg_mood'] <= 1)->count();

        if ($excellentDays >= 3) {
            $motivational = "¡Excelente! Esta semana tuviste $excellentDays días excelentes 🎉";
        } elseif ($lowMoodDays > 2) {
            $motivational = "Algunas semanas son difíciles, pero cada día es una oportunidad 🌱";
        } else {
            $motivational = "Vas progresando, sigue atento a tus emociones 💪";
        }

        return response()->json([
            'moods' => $moods,
            'history_week' => $days,
            'last_week_count' => $moods->count(),
            'last_week_avg' => number_format($moods->avg('mood_id'), 2),
            'excellent_days' => $excellentDays,
            'low_mood_days' => $lowMoodDays,
            'motivational_message' => $motivational,
        ]);
    }

    public function monthHistory($month)
    {
        $userId = 1;

        $year = now()->year;

        $from = Carbon::create($year, $month, 1)->startOfMonth();
        $to = Carbon::create($year, $month, 1)->endOfMonth();

        $days = $this->moodRepository->getAvgDayByDay($userId, $from, $to, false);

        return response()->json([
            'history_week' => $days,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'note' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric'
        ]);

        $log = MoodLog::create([
            'user_id' => 1,//$request->user()->id,
            'mood_id' => $data['mood_id'],
            'note' => $data['note'] ?? null,
            'latitude' => $data['latitude'] ?? null,
            'longitude' => $data['longitude'] ?? null,
        ]);

        return response()->json($log, 201);
    }
}


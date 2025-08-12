<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoodLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MoodLogController extends Controller
{
    public function index(Request $request)
    {
        $moods = MoodLog::with('mood')
            ->where('user_id', 1/*$request->user()->id*/)
            ->where('created_at', '>=', Carbon::now()->subDays(7)->startOfDay())
            ->latest()
            ->get();

        return response()->json(
            [
                'moods' => $moods,
                'last_week_count' => $moods->count(),
                'last_week_avg' => number_format($moods
                    ->avg('mood_id'), 2)

            ]
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'note' => 'nullable|string'
        ]);

        $log = MoodLog::create([
            'user_id' => 1,//$request->user()->id,
            'mood_id' => $data['mood_id'],
            'note' => $data['note'] ?? null
        ]);

        return response()->json($log, 201);
    }
}


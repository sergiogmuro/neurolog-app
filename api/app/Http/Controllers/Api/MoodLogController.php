<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoodLog;
use Illuminate\Http\Request;

class MoodLogController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            MoodLog::with('mood')
                ->where('user_id', 1/*$request->user()->id*/)
                ->latest()
                ->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'note'    => 'nullable|string'
        ]);

        $log = MoodLog::create([
            'user_id' => 1,//$request->user()->id,
            'mood_id' => $data['mood_id'],
            'note'    => $data['note'] ?? null
        ]);

        return response()->json($log, 201);
    }
}


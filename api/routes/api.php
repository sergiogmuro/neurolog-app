<?php

use App\Http\Controllers\Api\MoodLogController;
use App\Http\Controllers\MoodController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::get('/anon-id', function () {
    // Genera un string seguro (hash o UUID)
    $anonId = Str::uuid()->toString();
    // Opcional: guarda en BD o cache si quieres trackear
    return response()->json(['anon_id' => $anonId]);
});

//Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
    Route::get('/moods', [MoodController::class, 'index']);
    Route::get('/mood-logs', [MoodLogController::class, 'index']);
    Route::post('/mood-logs', [MoodLogController::class, 'store']);
//});

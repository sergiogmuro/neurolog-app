<?php

use App\Http\Controllers\MoodController;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    dd('ENTROOOO');
});
Route::get('/moods', [MoodController::class, 'index']);
Route::post('/moods', [MoodController::class, 'store']);


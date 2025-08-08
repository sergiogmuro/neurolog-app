<?php

use App\Http\Controllers\TrendController;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    dd('ENTROOOO');
});
Route::get('/trends', [TrendController::class, 'index']);
Route::post('/trends', [TrendController::class, 'store']);


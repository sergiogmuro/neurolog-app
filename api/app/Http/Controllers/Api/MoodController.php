<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mood;

class MoodController extends Controller
{
    public function index()
    {
        return response()->json(Mood::all());
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MoodLog extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'mood_id', 'note'];

    public function mood()
    {
        return $this->belongsTo(Mood::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

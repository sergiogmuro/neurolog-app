<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mood extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'emoji'];

    public function logs()
    {
        return $this->hasMany(MoodLog::class);
    }
}

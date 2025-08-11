<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mood;

class MoodSeeder extends Seeder
{
    public function run(): void
    {
        $moods = [
            ['name' => 'Triste', 'emoji' => 'Frown'],
            ['name' => 'Neutral', 'emoji' => 'Meh'],
            ['name' => 'Bien', 'emoji' => 'Smile'],
            ['name' => 'Super', 'emoji' => 'Smile'],
            ['name' => 'Excelente', 'emoji' => 'Laugh']
        ];

        foreach ($moods as $mood) {
            Mood::updateOrCreate(['name' => $mood['name']], $mood);
        }
    }
}

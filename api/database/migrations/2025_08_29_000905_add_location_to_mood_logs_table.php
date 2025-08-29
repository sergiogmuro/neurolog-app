<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mood_logs', function (Blueprint $table) {
            $table->double('latitude')->after('note')->nullable();
            $table->double('longitude')->after('latitude')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mood_logs', function (Blueprint $table) {
            $table->dropColumn(['latitude', 'longitude']);
        });
    }
};

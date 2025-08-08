<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('trends', function (Blueprint $table) {
            $table->id();
            $table->string('community');
            $table->string('trend');
            $table->integer('count');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('trends');
    }
};

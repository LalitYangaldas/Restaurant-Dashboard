<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Store restaurant name (e.g., "Tandoori Treats")
            $table->string('location'); // Store location (e.g., "Bangalore")
            $table->string('cuisine'); // Store cuisine type (e.g., "North Indian")
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    public function down(): void {
        Schema::dropIfExists('restaurants'); // Drop the table if migration is rolled back
    }
};
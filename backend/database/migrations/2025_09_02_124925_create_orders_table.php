<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade'); // Foreign key to restaurants, deletes orders if restaurant is deleted
            $table->integer('order_amount'); // Store order amount (e.g., 996)
            $table->timestamp('order_time'); // Store order time (e.g., "2025-06-24T15:00:00")
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders'); // Drop the table if migration is rolled back
    }
};
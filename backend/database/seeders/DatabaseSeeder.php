<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\Order;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        // Load restaurants from JSON
        $restaurantsJson = File::get(base_path('data/restaurants.json')); // Assumes JSON files are in data/ folder
        $restaurants = json_decode($restaurantsJson, true);
        foreach ($restaurants as $restaurant) {
            Restaurant::create($restaurant);
        }

        // Load orders from JSON
        $ordersJson = File::get(base_path('data/orders.json'));
        $orders = json_decode($ordersJson, true);
        foreach ($orders as $order) {
            Order::create($order);
        }
    }
}
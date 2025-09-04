<?php

use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/restaurants', [RestaurantController::class, 'index']); // List with search/sort/filter/pagination
Route::get('/orders/trends/{restaurant_id}', [OrderController::class, 'trends']); // Trends for a restaurant
Route::get('/restaurants/top-revenue', [RestaurantController::class, 'topRevenue']); // Top 3 by revenue
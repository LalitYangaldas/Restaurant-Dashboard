<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::query();

        // Search by name/location/cuisine
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('location', 'like', "%$search%")
                  ->orWhere('cuisine', 'like', "%$search%");
            });
        }

        // Sort
        if ($sort = $request->query('sort')) {
            [$field, $dir] = explode(':', $sort);
            $query->orderBy($field, $dir ?? 'asc');
        }

        // Filter by cuisine/location
        if ($cuisine = $request->query('cuisine')) {
            $query->where('cuisine', $cuisine);
        }

        if ($location = $request->query('location')) {
            $query->where('location', $location);
        }

        // Pagination
        return $query->paginate($request->query('per_page', 10));
    }


    public function topRevenue(Request $request)
    {
        // Append full time range for accurate day inclusion
        $startDate = $request->query('start_date', '2025-06-22') . ' 00:00:00';
        $endDate = $request->query('end_date', '2025-06-28') . ' 23:59:59';

        $top = Restaurant::withSum(['orders as revenue' => function ($q) use ($startDate, $endDate, $request) {
            $q->whereBetween('order_time', [$startDate, $endDate]);

            // Apply optional filters
            if ($minAmount = $request->query('min_amount')) {
                $q->where('order_amount', '>=', $minAmount);
            }
            if ($maxAmount = $request->query('max_amount')) {
                $q->where('order_amount', '<=', $maxAmount);
            }
            if ($minHour = $request->query('min_hour')) {
                $q->whereRaw('CAST(strftime("%H", order_time) AS INTEGER) >= ?', [$minHour]);
            }
            if ($maxHour = $request->query('max_hour')) {
                $q->whereRaw('CAST(strftime("%H", order_time) AS INTEGER) <= ?', [$maxHour]);
            }
        }], 'order_amount')
        ->orderByDesc('revenue')
        ->take(3)
        ->get();

        return response()->json($top);
    }
}

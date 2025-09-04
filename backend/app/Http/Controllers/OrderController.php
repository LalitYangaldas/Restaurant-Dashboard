<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function trends(Request $request, $restaurantId)
    {
        
        $startDate = $request->query('start_date', '2025-06-22') . ' 00:00:00';
        $endDate = $request->query('end_date', '2025-06-28') . ' 23:59:59';  

        $query = Order::where('restaurant_id', $restaurantId)
            ->whereBetween('order_time', [$startDate, $endDate]);

        // Applying filters
        if ($minAmount = $request->query('min_amount')) {
            $query->where('order_amount', '>=', $minAmount);
        }

        if ($maxAmount = $request->query('max_amount')) {
            $query->where('order_amount', '<=', $maxAmount);
        }

        if ($minHour = $request->query('min_hour')) {
            $query->whereRaw('CAST(strftime("%H", order_time) AS INTEGER) >= ?', [$minHour]);
        }

        if ($maxHour = $request->query('max_hour')) {
            $query->whereRaw('CAST(strftime("%H", order_time) AS INTEGER) <= ?', [$maxHour]);
        }

        // Daily orders count
        $dailyCounts = $query->clone()
            ->select(DB::raw('DATE(order_time) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Daily revenue
        $dailyRevenue = $query->clone()
            ->select(DB::raw('DATE(order_time) as date'), DB::raw('SUM(order_amount) as revenue'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Average order value per day
        $avgValue = $query->clone()
            ->select(DB::raw('DATE(order_time) as date'), DB::raw('AVG(order_amount) as avg_value'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Peak order hour per day
        $peakHours = $query->clone()
            ->select(
                DB::raw('DATE(order_time) as date'),
                DB::raw('CAST(strftime("%H", order_time) AS INTEGER) as hour'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date', 'hour')
            ->orderBy('date')
            ->orderByDesc('count')
            ->get()
            ->groupBy('date')
            ->map(fn($group) => $group->first()->hour);

        return response()->json([
            'daily_orders' => $dailyCounts,
            'daily_revenue' => $dailyRevenue,
            'avg_order_value' => $avgValue,
            'peak_hours' => $peakHours,
        ]);
    }
}

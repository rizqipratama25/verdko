<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Models\Alert;
use App\Models\MonitoredProduct;
use Exception;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    public function summary(Request $request) {
        try {
            $user = $request->user();

            return $this->successResponse([
                'total_products' => MonitoredProduct::where('user_id', $user->id)->count(),
                'success_checks' => MonitoredProduct::where('user_id', $user->id)->where('monitoring_status', 'success')->count(),
                'failed_checks' => MonitoredProduct::where('user_id', $user->id)->where('monitoring_status', 'failed')->count(),
                'alerts_sent' => Alert::where('is_sent', true)->whereHas('monitoredProduct', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->count()
            ]);
        } catch (Exception $e) {
            return $this->errorResponse("Failed to retrieve summary", 500, $e->getMessage());
        }
    }
}

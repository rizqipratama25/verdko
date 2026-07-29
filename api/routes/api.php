<?php

use App\Http\Controllers\Auth\DeleteAccountController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\MonitoredProductController;
use App\Http\Controllers\PriceHistoryController;
use App\Http\Controllers\Telegram\TelegramController;
use App\Jobs\ProcessWelcomeMail;
use App\Mail\WelcomeMail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::prefix('telegram')->group(function () {
    Route::post('/webhook', [TelegramController::class, 'handle']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/set-webhook', [TelegramController::class, 'setWebhook']);
    });
});

Route::prefix('auth')->group(function () {
    Route::post('/signup', [SignupController::class, 'signup'])->middleware('throttle:signup');
    Route::post('/login', [LoginController::class, 'login'])->middleware('throttle:login');

    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink'])->middleware('throttle:email-resend');
    Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword'])->middleware('throttle:forgot-password');

    Route::middleware(['auth:sanctum', 'verified'])->group(function () {
        Route::get('/me', [MeController::class, 'me']);
        Route::put('/edit-me', [MeController::class, 'editMeInfo']);
        Route::post('/logout', [LogoutController::class, 'logout']);
        Route::post('/delete-account', [DeleteAccountController::class, 'deleteAccount']);
    });
});

Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])->middleware(['auth:sanctum', 'throttle:email-resend'])->name('verification.send');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware(['signed'])->name('verification.verify');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/summary', [DashboardController::class, 'summary']);

    Route::get('/monitored-products', [MonitoredProductController::class, 'index']);
    Route::post('/monitored-product', [MonitoredProductController::class, 'store']);
    Route::put('/monitored-product/{monitoredProduct}', [MonitoredProductController::class, 'update']);
    Route::delete('/monitored-product/{monitoredProduct}', [MonitoredProductController::class, 'destroy']);

    Route::get('/price-histories', [PriceHistoryController::class, 'index']);
});

Route::post('/monitoring-results', [PriceHistoryController::class, 'store'])->middleware('scraper.key');

Route::get('/health', function () {
    try {
        DB::select('SELECT 1');

        return response()->json([
            'status' => 'healthy',
            'database' => 'connected',
        ], 200);
    } catch (Throwable $e) {
        return response()->json([
            'status' => 'unhealthy',
            'database' => 'disconnected',
        ], 503);
    }
});
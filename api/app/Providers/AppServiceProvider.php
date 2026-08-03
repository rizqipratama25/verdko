<?php

namespace App\Providers;

use App\ApiResponse;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    use ApiResponse;
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::createUrlUsing(function ($notifiable) {

            $backendUrl = URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes(60),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            return config('app.frontend_url')
                . '/email-verify?verify_url='
                . urlencode($backendUrl);
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {

            return config('app.frontend_url')
                . "/reset-password"
                . "?token={$token}"
                . "&email={$user->email}";
        });

        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->ip() . $request->input('email'))
                ->response(function (Request $request, array $headers) {
                    throw new HttpResponseException(
                        response()->json([
                            'success' => false,
                            'message' => 'Too many login attempts. Please try again in a minute.',
                        ], 429, $headers)
                    );
                });
        });

        RateLimiter::for('signup', function (Request $request) {
            return Limit::perMinute(3)
                ->by($request->ip())
                ->response(function (Request $request, array $headers) {
                    throw new HttpResponseException(
                        response()->json([
                            'success' => false,
                            'message' => 'Too many login attempts. Please try again in a minute.',
                        ], 429, $headers)
                    );
                });
        });

        RateLimiter::for('forgot-password', function (Request $request) {
            return Limit::perMinute(3)
                ->by($request->ip() . $request->input('email'))
                ->response(function (Request $request, array $headers) {
                    throw new HttpResponseException(
                        response()->json([
                            'success' => false,
                            'message' => 'Too many password reset requests. Please try again later.',
                        ], 429, $headers)
                    );
                });
        });

        RateLimiter::for('email-resend', function (Request $request) {
            return Limit::perMinute(2)
                ->by($request->user()?->id ?? $request->ip())
                ->response(function (Request $request, array $headers) {
                    throw new HttpResponseException(
                        response()->json([
                            'success' => false,
                            'message' => 'Too many email resend requests. Please try again later.',
                        ], 429, $headers)
                    );
                });
        });

        if (config('app.env') === 'production' || env('FORCE_HTTPS', false)) {
        URL::forceScheme('https');
    }
    }
}

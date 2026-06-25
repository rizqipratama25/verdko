<?php

namespace App\Http\Middleware;

use App\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ScraperMiddleware
{
    use ApiResponse;
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('X-Scraper-Key') !== env('SCRAPER_API_KEY')) {
            return $this->errorResponse('Unauthorized scraper request');
        }

        return $next($request);
    }
}

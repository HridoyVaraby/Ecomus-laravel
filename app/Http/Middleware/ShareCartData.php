<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ShareCartData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Get cart data from session
        $cart = Session::get('cart', []);
        
        // Share cart data with all Inertia views
        Inertia::share('cart', $cart);
        
        return $next($request);
    }
}
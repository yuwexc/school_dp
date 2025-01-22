<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        http_response_code(403);
        die(json_encode(['message' => 'Forbidden for you'], 403));
        //return $request->expectsJson() ? null : route('login');
    }
}

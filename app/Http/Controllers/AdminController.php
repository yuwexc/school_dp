<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        $recent_users = User::where('created_at', '>=', now()->subDays(7))->get();
        $teachers = User::where(['role_id' => 2]);
        $teachers_count = $teachers->get()->count();
        $latest_teachers = $teachers->where('created_at', '>=', now()->subDays(7))->get();

        return response([
            "users_count" => User::count(),
            "users_trend" => round($recent_users->count() / User::count() * 100, 2),
            "teachers_count" => $teachers_count,
            "teachers_trend" => round($latest_teachers->count() / $teachers_count * 100, 2),
            "categories_count" => Category::count(),
            "recent_users" => $recent_users,
            "recent_activities" => []
        ], 200);
    }
}

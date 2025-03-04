<?php

namespace Database\Factories;

use App\Models\AccessStatus;
use App\Models\Course;
use App\Models\CourseAccess;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseAccess>
 */
class CourseAccessFactory extends Factory
{
    protected $model = CourseAccess::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::all()->random(),
            'student' => User::where('role_id', 1)->get()->random(),
            'status_id' => AccessStatus::all()->random(),
        ];
    }
}

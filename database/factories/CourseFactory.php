<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Course;
use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_name' => fake()->word(),
            'course_description' => fake()->paragraph(),
            'level_id' => Level::all()->random(),
            'category_id' => Category::all()->random(),
            'image' => null,
            'author' => User::where('role_id', 2)->get()->random()
        ];
    }
}

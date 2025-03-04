<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lesson_number' => fake()->randomNumber(),
            'lesson_name' => fake()->word(),
            'lesson_description' => fake()->paragraph(),
            'lesson_body' => 1,
            'word_amount' => fake()->randomNumber(),
            'course_id' => Course::all()->random(),
            'lesson_status' => 2
        ];
    }
}

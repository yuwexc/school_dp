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
            'course_name' => $this->generateCourseName(),
            'course_description' => $this->generateDescription(),
            'level_id' => Level::inRandomOrder()->first()->id_level,
            'category_id' => Category::inRandomOrder()->first()->id_category,
            'image' => null,
            'author' => User::where('role_id', 2)->inRandomOrder()->first()->id_user,
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    private function generateCourseName(): string
    {
        $types = [
            'Beginner',
            'Intermediate',
            'Advanced',
            'Business',
            'Conversational',
            'IELTS',
            'TOEFL'
        ];

        $topics = [
            'English',
            'Grammar',
            'Vocabulary',
            'Speaking',
            'Writing',
            'Listening',
            'Pronunciation'
        ];

        return fake()->randomElement($types) . ' ' .
            fake()->randomElement($topics) . ' ' .
            fake()->randomElement(['Course', 'Program', 'Masterclass']);
    }

    private function generateDescription(): string
    {
        $courseType = strtolower(explode(' ', $this->generateCourseName())[0] ?? 'english');
        $topic = strtolower(explode(' ', $this->generateCourseName())[1] ?? 'language');

        return match ($courseType) {
            'beginner' => "Start your {$topic} journey with this beginner-friendly course",
            'advanced' => "Take your {$topic} skills to the next level",
            'business' => "Professional {$topic} for workplace success",
            default => "Comprehensive {$topic} course for all levels"
        };
    }
}

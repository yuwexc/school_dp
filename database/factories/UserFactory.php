<?php

namespace Database\Factories;

use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);
        $firstName = $gender === 'male'
            ? fake('ru_RU')->firstNameMale()
            : fake('ru_RU')->firstNameFemale();

        return [
            'first_name' => $firstName,
            'last_name' => fake('ru_RU')->lastName(),
            'middle_name' => $this->generateMiddleName($firstName),
            'phone' => '+7' . fake()->unique()->numerify('9#########'),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('Admin123*'),
            'photo' => null,
            'level_id' => Level::inRandomOrder()->first(),
            'role_id' => 2,
            'api_token' => null,
            'created_at' => now(),
            'updated_at' => null
        ];
    }

    private function generateMiddleName(string $firstName): ?string
    {
        if (!fake()->boolean(50)) {
            return null;
        }

        $maleMiddleNames = [
            'Иванович',
            'Алексеевич',
            'Дмитриевич',
            'Сергеевич',
            'Андреевич',
            'Петрович',
            'Николаевич',
            'Владимирович',
            'Юрьевич',
            'Олегович'
        ];

        $femaleMiddleNames = [
            'Ивановна',
            'Алексеевна',
            'Дмитриевна',
            'Сергеевна',
            'Андреевна',
            'Петровна',
            'Николаевна',
            'Владимировна',
            'Юрьевна',
            'Олеговна'
        ];

        $nameEnding = mb_substr($firstName, -1);

        if (in_array($nameEnding, ['а', 'я'])) {
            return fake()->randomElement($femaleMiddleNames);
        }

        return fake()->randomElement($maleMiddleNames);
    }


    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

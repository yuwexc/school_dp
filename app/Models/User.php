<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable, HasUlids;

    protected $table = 'users';
    protected $primaryKey = 'id_user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'level_id',
        'score',
        'phone',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'api_token',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected static function newFactory(): Factory
    {
        return UserFactory::new();
    }

    public function role(): HasOne
    {
        return $this->hasOne(Role::class, 'id_role', 'role_id');
    }

    public function level(): HasOne
    {
        return $this->hasOne(Level::class, 'id_level', 'level_id');
    }

    public function courses(): HasMany //автор
    {
        return $this->hasMany(Course::class, 'author', 'id_user');
    }

    public function accesses(): HasMany //студент (заявки)
    {
        return $this->hasMany(CourseAccess::class, 'student', 'id_user');
    }

    public function enrolled(): BelongsToMany
    {
        return $this->belongsToMany(
            Course::class,
            'course_accesses',
            'student',
            'course_id'
        )->wherePivot(
                'status_id',
                AccessStatus::where('status_code', 'enrolled')->get()->first()->id_access_status
            );
    }

    public function dones(): HasMany
    {
        return $this->hasMany(Done::class, 'student', 'id_user');
    }
}

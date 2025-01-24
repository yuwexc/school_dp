<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasFactory, HasApiTokens;

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

    public function role(): HasOne
    {
        return $this->hasOne(Role::class, 'id_role', 'role_id');
    }

    public function level(): HasOne
    {
        return $this->hasOne(Level::class, 'id_level', 'level_id');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'author', 'id_user');
    }

    public function accesses(): HasMany
    {
        return $this->hasMany(CourseAccess::class, 'student', 'id_user');
    }

    public function dones(): HasMany
    {
        return $this->hasMany(Done::class, 'student', 'id_user');
    }
}

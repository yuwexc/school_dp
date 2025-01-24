<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    use HasFactory;

    protected $table = 'levels';
    protected $primaryKey = 'id_level';

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'level_id', 'id_level');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'level_id', 'id_level');
    }
}

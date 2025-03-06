<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'courses';
    protected $primaryKey = 'id_course';

    protected $fillable = ['course_name', 'course_description', 'level_id', 'category_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author', 'id_user');
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id', 'id_level');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id_category');
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class, 'course_id', 'id_course');
    }

    public function accesses(): HasMany
    {
        return $this->hasMany(CourseAccess::class, 'course_id', 'id_course');
    }

}

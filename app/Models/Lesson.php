<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lesson extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'lessons';
    protected $primaryKey = 'id_lesson';

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id_course');
    }

    public function status(): HasOne
    {
        return $this->hasOne(LessonStatus::class, 'id_status', 'lesson_status');
    }

    public function dones(): HasMany
    {
        return $this->hasMany(Done::class, 'lesson_id', 'id_lesson');
    }

    public function done($id): HasOne
    {
        return $this->hasOne(Done::class, 'lesson_id', 'id_lesson')
        ->where('student', $id);
    }
}

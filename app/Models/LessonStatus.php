<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonStatus extends Model
{
    use HasFactory;

    protected $table = 'lesson_statuses';
    protected $primaryKey = 'id_status';

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'id_status', 'lesson_status');
    }
}

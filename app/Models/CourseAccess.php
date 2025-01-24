<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CourseAccess extends Model
{
    use HasFactory;

    protected $table = 'course_accesses';
    protected $primaryKey = 'id_course_access';

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'id_course');
    }

    public function status(): HasOne
    {
        return $this->hasOne(AccessStatus::class, 'id_access_status', 'status_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student', 'id_user');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Done extends Model
{
    use HasFactory;

    protected $table = 'dones';
    protected $primaryKey = 'id_done';

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'lesson_id', 'id_lesson');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student', 'id_user');
    }
}

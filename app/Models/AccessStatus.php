<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessStatus extends Model
{
    use HasFactory;

    protected $table = 'access_statuses';
    protected $primaryKey = 'id_access_status';

    public function course(): BelongsTo
    {
        return $this->belongsTo(CourseAccess::class, 'id_access_status', 'status_id');
    }
}

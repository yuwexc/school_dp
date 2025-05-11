<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'id_category';

    protected $fillable = [
        'category_name'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function category(): HasMany
    {
        return $this->hasMany(Course::class, 'category_id', 'id_category');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'number_of_questions',
        'duration_min',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
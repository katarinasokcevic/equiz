<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_over',
        'quiz_id',
        'user_id',
    ];


    public function quizSessionAnswers(): HasMany
    {
        return $this->hasMany(QuizSessionAnswer::class);
    }
}
<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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


    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function is_over(): bool
    {
        if ($this->is_over) {
            return true;
        }
        $diffMin = Carbon::now()->diffInMinutes($this->created_at);
        if ($diffMin > $this->quiz()->first()->duration_min) {
            $this->is_over = true;
            $this->save();
        }
        return $this->is_over;
    }
}
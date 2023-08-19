<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiz_session_answers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('quiz_session_id');
            $table->foreignId('question_id');
            $table->string('answer')->nullable();
            $table->boolean('is_correct')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiz_session_answers');
    }
};
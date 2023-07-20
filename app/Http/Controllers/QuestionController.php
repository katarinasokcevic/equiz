<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Inertia\Response;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request): Response
    {
        $quizId = $request->get('quiz_id');
        $quiz = Quiz::find($quizId);
        return Inertia::render('Questions/Form', [
            'quiz' => $quiz,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:250',
            'quiz_id' => 'required|int'
        ]);

        $quiz = Quiz::find($validated['quiz_id']);
        $question = $quiz->questions()->create($validated);

        return redirect(route('questions.edit', $question));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question): Response
    {
        $quiz = $question->quiz();
        return Inertia::render('Questions/Form', [
            'quiz' => $quiz,
            'question' => $question,
            'answers' => [], // TODO
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:250',
        ]);

        $question->update($validated);
        $question->save();
        return redirect(route('questions.edit', $question));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        //
    }
}
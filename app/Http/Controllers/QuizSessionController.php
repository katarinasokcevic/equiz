<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuizSession;
use App\Models\QuizSessionAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuizSessionController extends Controller
{


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request): Response
    {
        $quizId = $request->get('quiz_id');
        /**
         * @var Quiz $quiz
         * @var Question $question
         */
        $quiz = Quiz::find($quizId);
        $user = $request->user();

        if (!$quiz) {
            throw new \Exception('Quiz does not exist');
        }


        /** @var QuizSession $session */
        $session = QuizSession::where(['quiz_id' => $quiz->id, 'user_id' => $user->id])->first();

        $questionList = [];
        if ($session) {
            if ($session->is_over()) {
                return redirect(route('quizSessions.show'));
            }
            foreach ($session->quizSessionAnswers()->get() as $sessionQuestionAnswer) {
                $questionList[] = $sessionQuestionAnswer->question()->first();
            }
        } else {
            $session = new QuizSession();
            $session->user_id = $user->id;
            $session->quiz_id = $quiz->id;
            $session->is_over = false;
            $session->save();

            $questionList = $quiz->questions()->inRandomOrder()->limit($quiz->number_of_questions)->get();

            foreach ($questionList as $question) {
                $quizSessionAnswer = new QuizSessionAnswer();
                $quizSessionAnswer->quiz_session_id = $session->id;
                $quizSessionAnswer->question_id = $question->id;
                $quizSessionAnswer->save();
            }
        }

        $questions = [];
        foreach ($questionList as $question) {
            $answers = [
                $question->correct_answer,
                $question->wrong_answer1,
                $question->wrong_answer2,
                $question->wrong_answer3
            ];

            shuffle($answers);


            $questionData = [
                "question_id" => $question->id,
                "question" => $question->question,
                "answers" => $answers,
            ];

            $questions[] = $questionData;
        }


        return Inertia::render('QuizSessions/StartQuiz', [
            "quiz" => $quiz,
            "questions" => $questions,
            "timeLeft" => $session->time_left(),
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
            'quiz_id' => 'required|int',
            'is_over' => 'required|int',
        ]);

        $quizSession = new QuizSession($validated);
        $quizSession->save();

        return redirect(route('quizSessions.index'));
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuizSession  $quizSession
     * @return \Illuminate\Http\Response
     */
    public function show(QuizSession $quizSession)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\QuizSession  $quizSession
     * @return \Illuminate\Http\Response
     */
    public function edit(QuizSession $quizSession)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuizSession  $quizSession
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuizSession $quizSession)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuizSession  $quizSession
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuizSession $quizSession)
    {
        //
    }
}
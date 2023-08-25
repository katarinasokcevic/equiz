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
use Inertia\Response as InertiaResponse;

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
                $results = [];
                foreach ($session->quizSessionAnswers()->get() as $sessionQuestionAnswer) {
                    $question = $sessionQuestionAnswer->question()->first();
                    $results[] = [
                        "question" => $question->question,
                        "correctAnswer" => $question->correct_answer,
                        "userAnswer" => $sessionQuestionAnswer->answer,
                    ];
                }

                return Inertia::render('QuizSessions/QuizResults', [
                    "quiz" => $quiz,
                    "results" => $results,
                ]);
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
            "sessionId" => $session->id,
            "quiz" => $quiz,
            "questions" => $questions,
            "timeLeft" => $session->time_left(),
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuizSession  $quizSession
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, QuizSession $quizSession): RedirectResponse
    {
        $queryParameters = $request->all();
        if (!$quizSession) {
            throw new \Exception('Quiz Session ID not specified');
        }
        if ($quizSession->is_over()) {
            return redirect(route('quizSessions.show', $quizSession->id));
        }
        foreach ($quizSession->quizSessionAnswers()->get() as $sessionQuestionAnswer) {
            /** @var Question */
            $question = $sessionQuestionAnswer->question()->first();
            $questionId = $question->id;

            $key = 'q_' . $questionId;

            if (isset($queryParameters[$key])) {
                $sessionQuestionAnswer->answer = $queryParameters[$key];
                $isCorrect = $question->correct_answer === $sessionQuestionAnswer->answer;
                $sessionQuestionAnswer->is_correct = $isCorrect;
                $sessionQuestionAnswer->save();
            }

            $results[] = [
                "question" => $question->question,
                "correctAnswer" => $question->correct_answer,
                "userAnswer" => $sessionQuestionAnswer->answer,
            ];
        }
        $quizSession->is_over = true;
        $quizSession->save();

        return redirect(route('quizSessions.show', $quizSession->id));
    }

    public function show(QuizSession $quizSession): Response
    {
        $quiz = $quizSession->quiz()->first();
        $results = [];
        foreach ($quizSession->quizSessionAnswers()->get() as $sessionQuestionAnswer) {
            $question = $sessionQuestionAnswer->question()->first();
            $results[] = [
                "question" => $question->question,
                "correctAnswer" => $question->correct_answer,
                "userAnswer" => $sessionQuestionAnswer->answer,
            ];
        }

        return Inertia::render('QuizSessions/QuizResults', [
            "quiz" => $quiz,
            "results" => $results,
        ]);
    }
}
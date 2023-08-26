import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({
    auth,
    quiz,
    results,
    correctAnswers,
    totalQuestions,
}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <b>{quiz.name}</b>
                </h2>
            }
        >
            <Head title={quiz.name} />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between mb-6">
                    <h1>
                        <b>{quiz.name}</b>
                    </h1>
                    <h2 style={{ textAlign: "center" }}>
                        <b>
                            Correct answer: {correctAnswers} / {totalQuestions}
                            <br />
                            <span
                                style={{
                                    color:
                                        Math.round(
                                            (correctAnswers * 100) /
                                                totalQuestions
                                        ) > 50
                                            ? "green"
                                            : "red",
                                }}
                            >
                                (
                                {Math.round(
                                    (correctAnswers * 100) / totalQuestions
                                )}
                                %)
                            </span>
                        </b>
                    </h2>
                </div>
                {results.map((result) => (
                    <div
                        key={result.question}
                        className="lg:p-6 block rounded-md shadow-sm mb-4"
                    >
                        <h1>
                            <strong>{result.question}</strong>
                        </h1>
                        <p
                            style={{
                                color:
                                    result.userAnswer === null
                                        ? "red"
                                        : result.userAnswer ===
                                          result.correctAnswer
                                        ? "green"
                                        : "red",
                            }}
                        >
                            User's answer: {result.userAnswer ?? "(no answer)"}
                        </p>
                        <p>
                            <i>Correct answer: {result.correctAnswer}</i>
                        </p>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

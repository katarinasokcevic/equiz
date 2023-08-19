import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head } from "@inertiajs/react";

export default function Index({ auth, quiz, questions }) {
    const onOptionChange = (e) => {
        setAnswer(e.target.value);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {quiz.name}
                </h2>
            }
        >
            <Head title={quiz.name} />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1>
                    {quiz.name} ({quiz.duration_min} min)
                </h1>

                {questions.map((question) => (
                    <div className="lg:p-6 block rounded-md shadow-sm">
                        <h1>{question.question}</h1>
                        {question.answers.map((answer) => (
                            <div>
                                <input
                                    className="shadow p-3 mb-5 bg-white rounded"
                                    type="radio"
                                    name={"q_" + question.question_id}
                                    value={answer}
                                    onChange={onOptionChange}
                                />
                                {answer}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, quiz, question, answers }) {
    const { data, setData, post, patch, processing, reset, errors } =
        useForm(question);

    const submit = (e) => {
        e.preventDefault();
        if (question && question.id) {
            patch(route("questions.update", question.id), {});
        } else {
            post(route("questions.store", { quiz_id: quiz.id }), {
                onSuccess: () => reset(),
            });
        }
    };

    let buttonText = "Create Question";
    if (question && question.id) {
        buttonText = "Edit Question";
    }
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Question" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1>
                    Question for quiz: <strong>{quiz.name}</strong>
                </h1>
                <p>&nbsp;</p>
                <form onSubmit={submit}>
                    <p>Question:</p>
                    <input
                        type="text"
                        value={data.question}
                        placeholder="Question text"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("question", e.target.value)}
                    />
                    <InputError message={errors.question} className="mt-2" />

                    <p>&nbsp;</p>

                    <p>Correct Answer:</p>
                    <input
                        type="text"
                        value={data.correct_answer}
                        placeholder="Correct answer"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("correct_answer", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.correct_answer}
                        className="mt-2"
                    />

                    <p>Wrong answer 1:</p>
                    <input
                        type="text"
                        value={data.wrong_answer1}
                        placeholder="Wrong answer"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("wrong_answer1", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.wrong_answer1}
                        className="mt-2"
                    />

                    <p>Wrong answer 2:</p>
                    <input
                        type="text"
                        value={data.wrong_answer2}
                        placeholder="Wrong answer"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("wrong_answer2", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.wrong_answer2}
                        className="mt-2"
                    />

                    <p>Wrong answer 3:</p>
                    <input
                        type="text"
                        value={data.wrong_answer3}
                        placeholder="Wrong answer"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("wrong_answer3", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.wrong_answer3}
                        className="mt-2"
                    />

                    <PrimaryButton className="mt-4" disabled={processing}>
                        {buttonText}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

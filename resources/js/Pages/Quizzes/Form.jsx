import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, Head } from "@inertiajs/react";

export default function Index({ auth, quiz, questions }) {
    const { data, setData, post, patch, processing, reset, errors } =
        useForm(quiz);

    const submit = (e) => {
        e.preventDefault();
        if (quiz && quiz.id) {
            patch(route("quizzes.update", quiz.id), {});
        } else {
            post(route("quizzes.store"), { onSuccess: () => reset() });
        }
    };

    let buttonText = "Create Quiz";
    let questionSection;
    if (quiz && quiz.id) {
        buttonText = "Edit Quiz";
        let questionList = questions.map((question) => (
            <div
                key={question.question}
                className="mt-6 bg-white shadow-sm rounded-lg divide-y"
            >
                <div className="flex justify-between">
                    <div className="ml-2">{question.question}</div>
                    <Link href={route("questions.edit", question.id)}>
                        <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                </div>
            </div>
        ));
        questionSection = (
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <Link href={route("questions.create", { quiz_id: quiz.id })}>
                    <PrimaryButton>Add Question</PrimaryButton>
                </Link>
                <div>{questionList}</div>
            </div>
        );
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Quizzes" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <p>Quiz name:</p>
                    <input
                        type="text"
                        value={data.name}
                        placeholder="Quiz name"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <p>Number of questions:</p>
                    <input
                        type="text"
                        value={data.number_of_questions}
                        placeholder="Number of questions"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("number_of_questions", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.number_of_questions}
                        className="mt-2"
                    />
                    <p>Quiz duration in minutes:</p>
                    <input
                        type="text"
                        value={data.duration_min}
                        placeholder="Quiz duration in minutes"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("duration_min", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.duration_min}
                        className="mt-2"
                    />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        {buttonText}
                    </PrimaryButton>
                </form>
            </div>
            {questionSection}
        </AuthenticatedLayout>
    );
}

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head } from "@inertiajs/react";

export default function Index({ auth, quizzes }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quiz Maker
                </h2>
            }
        >
            <Head title="Quiz Maker" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <Link href={route("quizzes.create")}>
                    <PrimaryButton>Create Quiz</PrimaryButton>
                </Link>
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="mt-6 bg-white shadow-sm rounded-lg divide-y"
                    >
                        <div className="flex justify-between">
                            <div className="ml-2">
                                {" "}
                                <b>{quiz.name}</b>
                            </div>
                            <Link href={route("quizzes.edit", quiz.id)}>
                                <PrimaryButton>Edit</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

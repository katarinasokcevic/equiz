import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            List of all quizzes:
                        </div>
                    </div>
                    {props.quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="mt-6 bg-white shadow-sm rounded-lg divide-y"
                        >
                            <div className="flex justify-between">
                                <div className="ml-2">
                                    <p>{quiz.name}</p>
                                    <p>
                                        Number of questions:{" "}
                                        {quiz.number_of_questions}
                                    </p>
                                    <p>Quiz duration: {quiz.duration_min}</p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Link
                                        href={route("quizSessions.create", {
                                            quiz_id: quiz.id,
                                        })}
                                    >
                                        <PrimaryButton>Start</PrimaryButton>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

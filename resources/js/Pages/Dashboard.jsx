import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            List of all quizzes:
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {quizzes.map((quiz) => (
                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        <div className="flex justify-between">
                            <div class="ml-2">{quiz.name}</div>
                            <Link href={route("quizzes.edit", quiz.id)}>
                                <PrimaryButton>Start</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                ))}
            </div> */}
        </AuthenticatedLayout>
    );
}

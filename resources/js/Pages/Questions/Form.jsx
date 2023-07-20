import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth, quiz, question, answers }) {
    const { data, setData, post, patch, processing, reset, errors } = useForm(question);
 
    const submit = (e) => {
        e.preventDefault();
        if (question && question.id) {
            patch(route('questions.update', question.id), {  });
        } else {
            post(route('questions.store', {quiz_id: quiz.id}), { onSuccess: () => reset() });
        }

        
    };

    let buttonText = "Create Question"
    let answerSection;
    if (question && question.id) {
        buttonText = "Edit Question";
        let answerList = answers.map(question => 
            <p>{question.question}</p>
        );
        // TODO: use correct route for 
        answerSection = <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <Link href={route('questions.create')}>
                <PrimaryButton>Add Answer</PrimaryButton>
            </Link>
            <div>{answerList}</div>
            </div>;
    }
 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Question" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1>Add question for Quiz: <strong>{quiz.name}</strong></h1>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={data.question}
                        placeholder="Question text"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('question', e.target.value)} />
                    <InputError message={errors.question} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        {buttonText}
                    </PrimaryButton>
                </form>
            </div>
            {answerSection}
        </AuthenticatedLayout>
    );
}

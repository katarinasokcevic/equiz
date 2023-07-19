import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('quizzes.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Quizzes" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={data.name}
                        placeholder="Quiz name"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)} />
                    <InputError message={errors.name} className="mt-2" />
                    <input
                        type="text"
                        value={data.number_of_questions}
                        placeholder="Number of questions"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('number_of_questions', e.target.value)} />
                    <InputError message={errors.number_of_questions} className="mt-2" />
                    <input
                        type="text"
                        value={data.duration_min}
                        placeholder="Quiz duration in minutes"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('duration_min', e.target.value)} />
                    <InputError message={errors.duration_min} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Create quiz</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

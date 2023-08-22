import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head } from "@inertiajs/react";

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return [
        Math.floor(countDown / 60000),
        Math.floor((countDown % 60000) / 1000),
    ];
};

const CountDownTimer = ({ targetDate }) => {
    const [minutes, seconds] = useCountdown(targetDate);
    return minutes + seconds > 0 ? (
        <p>
            {minutes}:{seconds}
        </p>
    ) : (
        <p>Time expired!</p>
    );
};

export default function Index({ auth, quiz, questions, timeLeft }) {
    const onOptionChange = (e) => {
        setAnswer(e.target.value);
    };

    var quizEndTime = new Date().getTime() + parseInt(timeLeft) * 1000;

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
                <div className="flex justify-between mb-6">
                    <h1>
                        {quiz.name} ({quiz.duration_min} min)
                    </h1>
                    <CountDownTimer targetDate={quizEndTime} />
                </div>

                {questions.map((question) => (
                    <div className="lg:p-6 block rounded-md shadow-sm mb-4">
                        <h1>{question.question}</h1>
                        {question.answers.map((answer) => (
                            <div>
                                <input
                                    className="shadow p-3 mb-2 bg-white rounded"
                                    type="radio"
                                    name={"q_" + question.question_id}
                                    value={answer}
                                    onChange={onOptionChange}
                                />
                                {" " + answer}
                            </div>
                        ))}
                    </div>
                ))}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Link href={route("quizzes.index")}>
                        <PrimaryButton>Submit</PrimaryButton>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

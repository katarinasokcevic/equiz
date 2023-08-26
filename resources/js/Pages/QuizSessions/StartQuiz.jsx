import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";

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
    const timeLeftStr = minutes + ":" + seconds;
    const isUnderOneMinute = minutes === 0 && seconds <= 59;
    const style = {
        color: isUnderOneMinute ? "red" : "black",
    };
    return minutes + seconds > 0 ? (
        <p style={style}>{timeLeftStr}</p>
    ) : (
        <p>Time expired!</p>
    );
};

export default function Index({ auth, sessionId, quiz, questions, timeLeft }) {
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("quizSessions.update", sessionId), {});
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
                        <b>
                            {quiz.name} ({quiz.duration_min} min)
                        </b>
                    </h1>
                    <b>
                        <CountDownTimer targetDate={quizEndTime} />
                    </b>
                </div>
                <form onSubmit={submit}>
                    {questions.map((question) => (
                        <div
                            key={question.question_id}
                            className="lg:p-6 block rounded-md shadow-sm mb-4"
                        >
                            <h1>
                                <b>{question.question}</b>
                            </h1>
                            {question.answers.map((answer) => (
                                <div key={question.question_id + answer}>
                                    <input
                                        className="shadow p-3 mb-2 mt-2 bg-white rounded"
                                        type="radio"
                                        name={"q_" + question.question_id}
                                        value={answer}
                                        onChange={(e) =>
                                            setData(
                                                "q_" + question.question_id,
                                                e.target.value
                                            )
                                        }
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
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

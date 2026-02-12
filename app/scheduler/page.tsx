"use client";

import { useState, useEffect } from "react";

const Scheduler = () => {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold mb-6">Scheduler</h1>
            <p>Plan your day and manage your time effectively with our scheduler app.</p>
        </div>
    )
}
export default Scheduler;


interface Timer {
    id: string;
    name: string;
    duration: number;
    remaining: number;
    isActive: boolean;
    cycles: number;
}

export function TimerManager() {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [timerName, setTimerName] = useState("");
    const [timerDuration, setTimerDuration] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prev =>
                prev.map(timer => {
                    if (!timer.isActive) return timer;
                    const newRemaining = timer.remaining - 1;
                    return newRemaining <= 0
                        ? { ...timer, remaining: timer.duration, cycles: timer.cycles + 1 }
                        : { ...timer, remaining: newRemaining };
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addTimer = () => {
        if (timerName.trim()) {
            setTimers([...timers, {
                id: Date.now().toString(),
                name: timerName,
                duration: timerDuration,
                remaining: timerDuration,
                isActive: false,
                cycles: 0,
            }]);
            setTimerName("");
        }
    };

    const toggleTimer = (id: string) => {
        setTimers(timers.map(t => 
            t.id === id ? { ...t, isActive: !t.isActive } : t
        ));
    };

    const deleteTimer = (id: string) => {
        setTimers(timers.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Timer name"
                    value={timerName}
                    onChange={(e) => setTimerName(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="number"
                    placeholder="Duration (seconds)"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(Number(e.target.value))}
                    className="border p-2 w-full mb-2"
                />
                <button
                    onClick={addTimer}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Timer
                </button>
            </div>

            <div className="space-y-3">
                {timers.map(timer => (
                    <div key={timer.id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-bold">{timer.name}</h3>
                        <p className="text-2xl font-mono my-2">
                            {Math.floor(timer.remaining / 60)}:{(timer.remaining % 60).toString().padStart(2, '0')}
                        </p>
                        <p className="text-sm text-gray-600">Cycles: {timer.cycles}</p>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => toggleTimer(timer.id)}
                                className={`px-4 py-2 rounded text-white ${timer.isActive ? 'bg-red-500' : 'bg-green-500'}`}
                            >
                                {timer.isActive ? "Stop" : "Start"}
                            </button>
                            <button
                                onClick={() => deleteTimer(timer.id)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
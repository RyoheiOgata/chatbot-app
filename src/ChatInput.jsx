import { useState, Suspense } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { GoogleGenAI } from "@google/genai";



const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
async function fetchWeather() {
    await sleep(2000);
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=${api_key}`);
    const data = response.data;
    return data?.weather?.[0]?.description;
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
// const ai = new GoogleGenAI({ apiKey: 'abc' });
async function fetchAnswer(text) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: text,
    });
    return response.text;
}

export function ChatInput({ addHistory }) {
    const [text, setText] = useState('');

    const handleClick = async () => {
        if (!text) return;

        const userMessage = { role: 'user', content: text };
        let systemMessage = { role: 'system', content: 'Loading...' };

        addHistory(userMessage, systemMessage);
        setText(''); // 入力フィールドをクリア

        try {
            // const response = await fetchAnswer(text);
            const response = await fetchWeather();
            systemMessage = {
                role: 'system',
                content: response
            };
            addHistory(userMessage, systemMessage);

        } catch (error) {
            console.log(error);
        }


    };


    return (
        <div className='border p-4 rounded-lg space-x-2'>
            <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea textarea-ghost textarea-lg"
            />
            <div>
                <button
                    onClick={handleClick}
                    className="btn ml-auto">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div >
    )
}
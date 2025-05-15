import { useState } from "react";
import { Talk } from "./Talk";
import { ChatInput } from "./ChatInput";
import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function fetchAnswer() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "今日の松戸の天気を教えて。",
    });
    console.log(response.text);
}

await fetchAnswer();

export function Chat() {
    const [history, setHistory] = useState([]);

    const addHistory = (input) => {
        setHistory([...history, input])
    };

    return (
        <>

            <Talk
                history={history} />
            <ChatInput
                addHistory={addHistory} />
            {import.meta.env.VITE_GEMINI_API_KEY}
        </>
    )
}
import { useState } from "react";
import { Talk } from "./Talk";
import { ChatInput } from "./ChatInput";
import { GoogleGenAI } from "@google/genai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        }
    }
});


export function Chat() {
    const [history, setHistory] = useState([]);
    const addHistory = (input) => {
        setHistory([...history, input])
    };


    return (
        <>
            <Talk
                history={history} />
            <QueryClientProvider client={queryClient}>
                <ChatInput
                    addHistory={addHistory} />
            </QueryClientProvider>
            {import.meta.env.VITE_GEMINI_API_KEY}
        </>
    )
}



// const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// async function fetchAnswer() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "今日の松戸の天気を教えて。",
//     });
//     console.log(response.text);
// }

// await fetchAnswer();
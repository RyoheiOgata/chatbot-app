import { useState, Suspense } from "react";
import { Talk } from "./Talk";
import { ChatInput } from "./ChatInput";
import { GoogleGenAI } from "@google/genai";
import { ErrorBoundary } from 'react-error-boundary';
import { TestWeather } from "./TestWeather";

import { useQuery } from "@tanstack/react-query";

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

            <Suspense fallback={<p>Loading...</p>}>
                <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
                    <QueryClientProvider client={queryClient}>
                        <TestWeather />
                    </QueryClientProvider>
                </ErrorBoundary>
            </Suspense >


            <Talk
                history={history} />
            <ChatInput
                addHistory={addHistory} />
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
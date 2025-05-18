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
    const [text, setText] = useState();

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
        <Box sx={{
            border: 1,
            borderRadius: '10px',
            display: 'flex', // Flexboxコンテナとして設定
            flexDirection: 'column', // 子要素を縦に並べる（TextFieldとButtonのコンテナ用）
            position: 'relative', // Buttonを絶対位置指定するための基準点
        }}>

            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                variant="outlined"
                sx={{
                    'fieldset': {
                        border: 'none'
                    },
                    flexGrow: 1,
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}

            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Buttonを右端に寄せる
                padding: '8px' // ボタン周りの余白（任意）
            }}>
                <Button
                    endIcon={<SendIcon />}
                    onClick={handleClick} />
            </Box>
        </Box>
    )
}
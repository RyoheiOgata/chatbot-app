import { useState, Suspense } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useQuery } from "@tanstack/react-query";


const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
const fetchWeather = async () => {
    console.log('fetchWeatherスタート')
    await sleep(2000);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=1ae64f8e15da22af443aac6b1e5b87cd`);
    if (res.ok) {
        return res.json()
    }
    throw new Error(res.statusText);
};


export function ChatInput({ addHistory }) {
    const [text, setText] = useState();
    const {
        data,
        isLoading,
        isError,
        error,
        refetch } = useQuery({ queryKey: ['weather'], queryFn: fetchWeather });

    const handleClick = async () => {
        if (!text.trim()) { // 入力が空の場合は何もしない（任意）
            return;
        }
        try {
            // refetch() を実行し、完了を待つ
            // refetch() は Promise<UseQueryResult> を返す
            // その Promise が解決されたときの UseQueryResult から data を取得できる
            const { data: fetchedData, isSuccess } = await refetch();

            if (isSuccess && fetchedData) {
                // 成功し、データが取得できたらaddHistoryを呼び出す
                await addHistory({
                    input: text,
                    output: fetchedData?.weather?.[0]?.description,
                    generated: true
                });
                setText(''); // 入力フィールドをクリア
            } else {
                // データ取得に失敗した場合の処理（任意）
                console.error("天気の取得に失敗しました。");
                // ユーザーにエラーを通知するなどの処理を追加できます
                await addHistory({
                    input: text,
                    output: "天気情報を取得できませんでした。", // エラーメッセージを履歴に追加
                    generated: true
                });
            }
        } catch (e) {
            // refetch 中にエラーが発生した場合の処理
            console.error("handleClick内のエラー:", e);
            await addHistory({
                input: text,
                output: "エラーが発生しました。",
                generated: true
            });
            // setText('');
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
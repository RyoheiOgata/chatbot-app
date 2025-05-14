import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export function ChatInput({ addHistory }) {
    const [text, setText] = useState();


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
                    flexGrow: 1, // TextFieldが可能な限りスペースを埋めるようにする
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
                    onClick={() => {
                        addHistory({ ai: false, text: text });
                        setText('');
                    }} />
            </Box>
        </Box>
    )
}
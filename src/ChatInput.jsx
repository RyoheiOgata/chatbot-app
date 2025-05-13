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
            borderRadius: '10px'
        }}>
            <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                variant="outlined"
                sx={{
                    'fieldset': {
                        border: 'none'
                    }
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}

            />
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                    addHistory({ ai: false, text: text });
                    setText('');
                }} />
        </Box>
    )
}
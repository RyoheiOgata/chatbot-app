import { useState } from "react";
import Box from '@mui/material/Box';


export function Talk({ history }) {

    return (
        <Box >
            {history.map(h => (
                <Box sx={{
                    border: 1,
                    borderRadius: '15px 0 15px 15px',
                    m: '10px',
                    whiteSpace: "pre-wrap"
                }}>
                    {h.text}
                </Box>
            ))}
        </Box>
    )
}
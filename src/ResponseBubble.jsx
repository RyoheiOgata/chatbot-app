import Box from '@mui/material/Box';

export function ResponseBubble({line}) {
    return (
        <Box sx={{
            border: 1,
            borderRadius: '0 15px 15px 15px',
            borderColor: 'red',
            m: '10px',
            whiteSpace: "pre-wrap"
        }}>
            {line.output}
        </Box>
    )
}
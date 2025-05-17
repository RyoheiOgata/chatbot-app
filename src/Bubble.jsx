import Box from '@mui/material/Box';
import { ResponseBubble } from './ResponseBubble';




export function Bubble({ line }) {



    return (
        <Box>
            <Box sx={{
                border: 1,
                borderRadius: '15px 0 15px 15px',
                m: '10px',
                whiteSpace: "pre-wrap"
            }}>
                {line.input}
            </Box>

            {line.generated &&
                <ResponseBubble line={line} />
            }
        </Box>

    )
}
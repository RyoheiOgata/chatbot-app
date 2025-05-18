import Box from '@mui/material/Box';
import { Bubble } from "./Bubble";


export function Talk({ history }) {

    return (
        <Box >
            {history.map((h, i) => (
                <Bubble
                    line={h}
                    key={i} />
            ))}
        </Box>
    )
}
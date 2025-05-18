import Box from '@mui/material/Box';
import { Bubble } from "./Bubble";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        }
    }
});

export function Talk({ history }) {

    return (
        <Box >
            {history.map((h, i) => (
                <QueryClientProvider client={queryClient} key={i}>
                    <Bubble
                        line={h} />
                </QueryClientProvider>
            ))}
        </Box>
    )
}
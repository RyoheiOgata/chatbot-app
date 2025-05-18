import { useState } from "react";
import { Talk } from "./Talk";
import { ChatInput } from "./ChatInput";


export function Chat() {
    const [history, setHistory] = useState([]);
    const addHistory = (...input) => {
        setHistory([...history, ...input])
    };


    return (
        <>
            <Talk
                history={history} />
                <ChatInput
                    addHistory={addHistory} />
        </>
    )
}




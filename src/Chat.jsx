import { useState } from "react";
import { Talk } from "./Talk";
import { ChatInput } from "./ChatInput";

export function Chat() {
    return (
        <>
            <Talk />
            <ChatInput />
        </>
    )
}
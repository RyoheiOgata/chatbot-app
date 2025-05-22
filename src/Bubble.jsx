
export function Bubble({ line }) {
    return (
        <div className={`chat 
            ${line.role === 'system'
                ? 'chat-start'
                : 'chat-end'
            }`}>
            <div className="chat-bubble chat-bubble-primary">
                {line.content}
            </div>
        </div>
    )
}
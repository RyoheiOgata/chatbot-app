import ReactMarkdown from 'react-markdown';

export function Bubble({ line }) {
    return (
        <div className={`chat 
            ${line.role === 'system'
                ? 'chat-start'
                : 'chat-end'
            }`}>
            <div className="chat-bubble chat-bubble-primary">
                {line.role === 'system'
                    ? <ReactMarkdown>{line.content}</ReactMarkdown>
                    : line.content}


            </div>
        </div>
    )
}
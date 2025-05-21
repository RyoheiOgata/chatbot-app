
export function Bubble({ line }) {
    return (
        <div sx={{
            border: 1,
            borderRadius: '15px 0 15px 15px',
            m: '10px',
            whiteSpace: "pre-wrap",
            borderColor: line.role === 'system' && 'red',
        }}>
            {line.content}
        </div>
    )
}
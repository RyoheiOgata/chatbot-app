import { Bubble } from "./Bubble";


export function Talk({ history }) {

    return (
        <div className="overflow-auto">
            {history.map((h, i) => (
                <Bubble
                    line={h}
                    key={i} />
            ))}
        </div>
    )
}
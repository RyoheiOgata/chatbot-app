import { Bubble } from "./Bubble";


export function Talk({ history }) {

    return (
        <div >
            {history.map((h, i) => (
                <Bubble
                    line={h}
                    key={i} />
            ))}
        </div>
    )
}
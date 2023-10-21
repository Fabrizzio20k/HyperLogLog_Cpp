import './Circlegraph.css'

export default function Circlegraph(props){
    return(
        <div className="flex-wrapper">
            <div className="single-chart">
                <svg viewBox="0 0 36 36" className={`circular-chart ${props.color}`}>
                <path className={`circle-bg ${props.color}`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    strokeDasharray={`${props.percentage}, 100`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{props.percentage}%</text>
                </svg>
            </div>
            <h2> {props.message} </h2>
        </div>
    );
}
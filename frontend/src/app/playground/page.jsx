import './styles.css'

export default function Page() {
    return (
        <div className='playground-page'>
            <div className='control-panel'>
                <h1>Hello world</h1>
                <h1>Hello world aassa as sa sa as as as as sasa</h1>
            </div>
            

            <div className='graphic-panel'>
                <div class="flex-wrapper">
                    <div class="single-chart">
                        <svg viewBox="0 0 36 36" class="circular-chart orange">
                        <path class="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path class="circle"
                            stroke-dasharray="30, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" class="percentage">30%</text>
                        </svg>
                    </div>
                    <h1>30% of precision respect to set and vector</h1>
                </div>

                <div class="flex-wrapper">
                    <div class="single-chart">
                        <svg viewBox="0 0 36 36" class="circular-chart orange">
                        <path class="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path class="circle"
                            stroke-dasharray="60, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" class="percentage">60%</text>
                        </svg>
                    </div>
                    <h1>60% of precision</h1>
                </div>

                <div class="flex-wrapper">
                    <div class="single-chart">
                        <svg viewBox="0 0 36 36" class="circular-chart orange">
                        <path class="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path class="circle"
                            stroke-dasharray="90, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" class="percentage">90%</text>
                        </svg>
                    </div>
                    <h1>90% of precision gaa</h1>
                </div>
                
            </div>
            
            
        </div>
    );
}
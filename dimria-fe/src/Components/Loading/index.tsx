import { BusyIndicator, BusyIndicatorSize } from '@ui5/webcomponents-react';
import './index.css'

export default function Loading() {
    return (
        <div className="container">
            <BusyIndicator active size={BusyIndicatorSize.Large} delay={0} />
        </div>
    );
}
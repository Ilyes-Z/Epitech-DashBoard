import React from 'react';
import WeatherService from './Weather';

function WeatherDispatch(widget, parameters) {
    switch (widget) {
        case 'day':
            return <WeatherService props={parameters} />;
        default:
            return;
    }
}

export default WeatherDispatch;
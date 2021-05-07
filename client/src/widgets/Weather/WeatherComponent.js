import React from 'react';
// import { withStyles } from "@material-ui/core/styles";
// import { Container, TextField } from '@material-ui/core';

const Weather = props => {
  return (
    <div>
      <div>
        <h1>{props.cityname}</h1>
        <h5>
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h5>
        {props.temp_celsius ? (
          <h1>{props.temp_celsius}&deg;</h1>
        ) : null}
        {maxminTemp(props.temp_min, props.temp_max)}
        <h4>
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span>{min}&deg;</span>
        <span>{max}&deg;</span>
      </h3>
    );
  }
}
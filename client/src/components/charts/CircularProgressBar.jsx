import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({ performance, color }) => {


  let pathValue = performance;
  let textColor = `rgba(255, 255, 255, 0.4)`;

  if (performance > 100) {
    pathValue = 200 - performance;
  };

  //color will change to gold if there is a score within 10%
  let text = `${performance}%`;
  let textSize = '25px';

  if (Math.abs(performance - 100) <= 10) {
    color = '#fece21'
    text = '\u2605';
    textSize = '45px';
    textColor = '#fece21';
  };

  //customize colors

  return (
    <div style={{ width: 100, height: 100 }}>

      <CircularProgressbar
        variant="success"
        value={pathValue}
        text={text}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: 'round',
          textSize: textSize,
          pathTransitionDuration: 0.5,
          pathColor: color,
          textColor: textColor,
          backgroundColor: color,
          trailColor: 'rgba(0,0,0, 0.3)'
        })}
      />
    </div>

  );

}

export default CircularProgress;
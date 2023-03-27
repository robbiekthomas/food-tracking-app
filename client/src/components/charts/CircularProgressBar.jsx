import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({ performance, color }) => {

  let pathValue = performance;

  if (performance > 100) {
    pathValue = 200 - performance;
  };

  //color will change to gold if there is a score within 10%
  let text = `${performance}%`;
  let textSize = '20px';

  if (Math.abs(performance - 100) <= 10) {
    color = '#D4A537'
    text = '\u2605';
    textSize = '30px';
  };

  //customize colors
  const hex = color.replace('#', '');
console.log('performance',performance);
  // Convert the hex color code to a decimal value
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
    return  (
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
        pathColor: `rgba(${r}, ${g}, ${b}, ${pathValue / 80})`,
        textColor: color,
        backgroundColor: color,
      })}
    />
  </div>

  );
 
}

export default CircularProgress;
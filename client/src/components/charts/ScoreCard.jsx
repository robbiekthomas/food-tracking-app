import React from 'react';
import ChartsHeader from './ChartsHeader';


const ScoreCard = ({ title, score, id }) => {
  let feedback = '';
  let color = '';
  //is score in the ideal range? Depends on b4 or after
  if (id === 'before') {
    if (score <= 3 || score > 7) {
      color = '#007bff';
    } else {
      color = '#28a745';
    }
  }

  //give feedback based on score

  //color based on feedback
  let text = `${performance}%`;
  let textSize = '20px';

  if (Math.abs(performance - 100) <= 10) {
    color = '#D4A537'
    text = '\u2605';
    textSize = '30px';
  };

  //customize colors
  const hex = color.replace('#', '');

  // Convert the hex color code to a decimal value
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return (
    <div style={{ width: 100, height: 100 }}>
      <ChartsHeader title={title} />
      <div style={{color: color}}>{Math.round(score)}</div>
      <div style={{color: color}}>{feedback}</div>
    </div>

  )
}

export default ScoreCard
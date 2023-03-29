import React from 'react';
import ChartsHeader from './ChartsHeader';


const ScoreCard = ({ title, score, id }) => {
  let feedback = '';
  let color = '';
  //is score in the ideal range? Depends on b4 or after
  if (id === 'before' || id === 'after') {
    if (score < 4) {
      color = '#ad1deb';
      feedback = 'Try to eat earlier'
    } else if (score > 7) {
      color = '#ffa645';
      feedback = 'Try to eat less in each sitting'
    } else {
      color = '#28a745';
      feedback = 'Gnarly'
    }
  }

  if (score < 1) {
    color = '#fff';
    feedback = 'No Entries Yet!'
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
    <div className="flex-column w-full" style={{ height: 100 }}>
      <ChartsHeader title={title} />
      <div className='flex center items-center justify-center '>

        {Math.round(score) > 0 &&
          <>
            <div className='text-center w-4/5' style={{ color: color }}>{feedback}</div>
            <div className='text-center w-1/5 text-4xl' style={{ color: color }}>{Math.round(score)}</div>
          </>
        }

        {Math.round(score) === 0 &&
            <div className='text-center w-5/5 opacity-60' style={{ color: color }}>{feedback}</div>
        }
      </div>


    </div>

  )
}

export default ScoreCard
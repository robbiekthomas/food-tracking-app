import React from 'react';
import ChartsHeader from './ChartsHeader';


const ScoreCard = ({ title, score, id }) => {
  let feedback = '';
  let color = '';
  //is score in the ideal range? Depends on b4 or after
  if (id === 'before' || id === 'after') {
    if (score < 4) {
      color = '#ffb114';
      feedback = 'Try to eat earlier'
    } else if (score > 7) {
      color = '#ffb114';
      feedback = 'Take more time between bites '
    } else {
      color = '#1dcc2e';
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
    <div className="flex-column justify-center w-full" style={{ height: 120 }}>
      <ChartsHeader title={title} />
      <div className='flex flex-col center items-center justify-evenly '>

        {Math.round(score) > 0 &&
          <>
            <div className='text-center w-1/5 text-4xl py-2 numberCircle' style={{ color: color }}>{Math.round(score)}</div>
            <div className='text-center w-4/5 text-xl text-bold mt-1' style={{ color: color }}>{feedback}</div>
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
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const Card = ({ title, target, performance, color }) => {

  //color will change to be more vibrant to less vibrant as they get closer/farther from the target

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

  // Convert the hex color code to a decimal value
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return (
    <div className="shadow-sm relative flex-col  break-words text-dimWhite rounded-lg bg-clip-border bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10 " >
      <div className="flex-column pl-1 pr-1 pt-2 pb-2 justify-center items-center">
        <div className="flex flex-wrap">
          {(title !== 'Maintenance Calories' && title !== 'Hunger Before Eating' && title !== 'Hunger After Eating') &&
            <div className="flex-none w-2/3 max-w-full px-5">
              <div>
                <p className="mb-2 font-sans font-semibold leading-normal text-l">{title}</p>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <h5 className="mb-0 text-s">{target}</h5>
                  </div>
                </div>
              </div>
            </div>
          }
          {(title === 'Maintenance Calories' || title === 'Hunger Before Eating' || title === 'Hunger After Eating') &&
            <div className="flex-none w-3/3 max-w-full px-5">
              <div>
                <p className="mb-2 font-sans font-semibold leading-normal text-l">{title}</p>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <h5 className="mb-0 text-s">{target}</h5>
                  </div>
                </div>
              </div>
            </div>
          }

          {(title !== 'Maintenance Calories' && title !== 'Hunger Before Eating' && title !== 'Hunger After Eating') &&
            <div
              style={{ width: 60, height: 60 }}>

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
          }
        </div>
      </div>
    </div>
  )
}

export default Card
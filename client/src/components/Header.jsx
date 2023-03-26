import React, { useState, useEffect } from 'react'
import DateSelector from "./DateSelector";
import { useModeContext } from "../contexts/mode-status";
import CircularProgress from './charts/CircularProgressBar';
import ChartHeader from './charts/ChartsHeader';
import classNames from 'classnames';

const Header = (
  {
    day,
    changeDay,
    dailyStats,
    targetCalories,
    fat,
    protein,
    carbs
  }
) => {
  const { mode, setMode } = useModeContext();

  const [proActual, setProActual] = useState(0)
  const [fatActual, setFatActual] = useState(0)
  const [choActual, setChoActual] = useState(0)
  const [hungerBefore, setHungerBefore] = useState(0)
  const [hungerAfter, setHungerAfter] = useState(0)
  const [caloriesActual, setCaloriesActual] = useState(0)

  useEffect(() => {
    if (dailyStats) {
      setProActual(dailyStats.protein);
      setFatActual(dailyStats.fat);
      setChoActual(dailyStats.carbs);
      setHungerBefore(dailyStats.hungerBefore);
      setHungerAfter(dailyStats.hungerAfter);
    }

    if (!dailyStats) {
      setProActual(0);
      setFatActual(0);
      setChoActual(0);
      setHungerBefore(0);
      setHungerAfter(0);
    }

  }, [dailyStats])

  useEffect(() => {
    const kcal = (proActual * 4) + (fatActual * 9) + (choActual * 4)
    setCaloriesActual(kcal || 0);
  }, [proActual, fatActual, choActual])


  return (
    <div>
      {/**HEADINGS */}
      {mode === "precise" && <h1 className="font-xl">Precise Food Tracker</h1>}
      {mode === "intuitive" && <h1 className="font-xl">Intuitive Food Tracker</h1>}
      {mode === "standard" && <h1 className="font-xl">Standard Food Tracker</h1>}

      {/**DATE PICKER */}
      <DateSelector day={day} changeDay={changeDay} />


      {/**PRECISE */}
      {mode === "precise" &&
        <div className={classNames('w-full', 'grid', 'grid-cols-4', 'grid-rows-2, gap-3')}>

          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Calories'} />
            <CircularProgress
              title='Calories'
              color='#666666'
              performance={Math.round(caloriesActual / targetCalories * 100)}
            />
          </div>
          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Protein'} />
            <CircularProgress
              title='Calories'
              color='#666666'
              performance={Math.round(proActual / protein * 100)}
            />
          </div>
          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Fat'} />
            <CircularProgress
              title='Calories'
              color='#666666'
              performance={Math.round(fatActual / fat * 100)}
            />
          </div>
          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Carbs'} />
            <CircularProgress
              title='Calories'
              color='#666666'
              performance={Math.round(choActual / carbs * 100)}
            />
          </div>

        </div>
      }

      {mode === "intuitive" &&
        <div>
        </div>
      }
      {mode === "standard" &&
        <div>
        </div>
      }
    </div>
  )
}

export default Header
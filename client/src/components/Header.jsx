import React, { useState, useEffect } from 'react'
import DateSelector from "./DateSelector";
import { useModeContext } from "../contexts/mode-status";
import CircularProgress from './charts/CircularProgressBar';
import ScoreCard from './charts/ScoreCard';
import ChartHeader from './charts/ChartsHeader';
import classNames from 'classnames';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Header = (
  {
    day,
    changeDay,
    dailyStats,
    targetCalories,
    fat,
    protein,
    carbs,
    mood
  }
) => {
  const { mode, setMode } = useModeContext();

  console.log('mood', mood)
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

  const gradientStyling =
  "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";

  return (
    <div>
      {/**HEADINGS */}
      {mode === "precise" && <h1 className="font-xl">Precise Food Tracker</h1>}
      {mode === "intuitive" && <h1 className="font-xl">Intuitive Food Tracker</h1>}
      {mode === "standard" && <h1 className="font-xl">Standard Food Tracker</h1>}

      {/**DATE PICKER */}
      <DateSelector />


      {/**PRECISE */}
      {mode === "precise" &&
        <div className={classNames('w-full', 'grid', 'grid-cols-4', 'grid-rows-2, gap-3')}>

          {caloriesActual &&
            <div className='flex-column justify-center align-center'>
              <ChartHeader title={'Calories'} />
              <CircularProgress
                title='Calories'
                color='#666666'
                performance={Math.round(caloriesActual / targetCalories * 100)}
              />
            </div>
          }

          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Protein'} />
            <CircularProgress
              title='Protein'
              color='#ffb114'
              performance={Math.round(proActual / protein * 100)}
            />
          </div>
          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Fat'} />
            <CircularProgress
              title='Fat'
              color='#666666'
              performance={Math.round(fatActual / fat * 100)}
            />
          </div>
          <div className='flex-column justify-center align-center'>
            <ChartHeader title={'Carbs'} />
            <CircularProgress
              title='Carbs'
              color='#48a1e6'
              performance={Math.round(choActual / carbs * 100)}
            />
          </div>

        </div>
      }

      {mode === "intuitive" &&
        <div className={classNames('w-full', 'grid', 'grid-cols-4', 'grid-rows-2, gap-3')}>


          <div className='flex-column justify-center align-center'>
            <ScoreCard
              title='Average Hunger Before Eating'
              score={hungerBefore}
              id='before'
            />
          </div>
          <div className='flex-column justify-center align-center'>

            <ScoreCard
              title='Average Hunger After Eating'
              score={hungerAfter}
              id='after'
            />
          </div>


          {(mood && mood.length > 0) &&
            <div className="align-center pb-5">
              <p className="mt-5 mb-5 w-full text-center font-bold text-gray-400 text-xl">
                Top Feelings After Eating
              </p>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Count of Entries</TableCell>
                      <TableCell>Feeling</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                  {mood.length < 1 &&
                      <TableRow>
                       
                        <TableCell>No Moods to Display.</TableCell>
                      </TableRow>
                    }

                    {mood.length > 0 &&
                      <TableRow>
                        <TableCell>{mood[0].count}</TableCell>
                        <TableCell>{mood[0].feeling}</TableCell>
                      </TableRow>
                    }


                    {mood.length > 1 &&
                      <TableRow>
                        <TableCell>{mood[1].count}</TableCell>
                        <TableCell>{mood[1].feeling}</TableCell>
                      </TableRow>
                    }

                    {mood.length > 2 &&
                      <TableRow>
                        <TableCell>{mood[2].count}</TableCell>
                        <TableCell>{mood[2].feeling}</TableCell>
                      </TableRow>
                    }

                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }

        </div>
      }



      {mode === "standard" &&
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
              title='Protein'
              color='#ffb114'
              performance={Math.round(proActual / protein * 100)}
            />
          </div>


        </div>
      }
    </div>
  )
}

export default Header
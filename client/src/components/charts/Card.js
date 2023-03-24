import React from 'react'
import Progress from './ProgressBar';

const Card = ({ title, target, performance, unit }) => {
  return (
    <div className="relative flex flex-col w-3/12 min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-column pl-2 pr-2 pt-6 pb-6">
        <div className="flex flex-wrap -mx-3">


          <div className="flex-none w-2/3 max-w-full px-5">
            <div>
              <p className="mb-0 font-sans font-semibold leading-normal text-l">{title}</p>
              <div className='flex justify-between'>
                <div className='flex'><h5 className="mb-0 font-bold">
                  {target} </h5>
                  <h5> {unit}</h5>
                </div>
                
              </div>
            </div>
          </div>

          <div className="w-4/12 max-w-full text-right flex-0">
            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-indigo-700 to-pink-purple shadow-soft-2xl">
              <i className="ni ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        < Progress now={performance} />
      </div>
    </div>
  )
}

export default Card
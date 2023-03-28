const { differenceInDays, parse } = require('date-fns');



const getMaintenanceCalories = (w, bf) => {
  const cal = 370 + (9.8 * w * (100 - bf) / 100) * 1.5;
  return Math.round(cal);
};

const getTargetCalories = (wpwc, maintenance) => {
  const cal = maintenance + (wpwc * 3500 / 7);
  return Math.round(cal);
};

const getProtein = (weight, sx, bf) => {
  let multiplier = 0;
  if (sx === 'male') {
    if (bf <= 20) {
      multiplier = 1;
    } else if (bf <= 25) {
      multiplier = 0.8;
    } else {
      multiplier = 0.73;
    }
  }

  if (sx !== 'male') {
    if (bf <= 25) {
      multiplier = 1;
    } else {
      multiplier = 0.8;
    }
  }

  const protein = weight * multiplier;
  return Math.round(protein);
};

const getFat = (weight, sx, bf) => {
  let multiplier = 0;

  if (sx === 'male') {
    if (bf < 25) {
      multiplier = 0.22;
    } else {
      multiplier = 0.25;
    }
  };

  if (sx !== 'male') {
    multiplier = 0.3;
  };

  const fat = weight * multiplier;
  return Math.round(fat);
};

const getCarbs = (cal, pro, fat) => {
  const cho = [cal - (pro * 4) - (fat * 9)] / 4
  return Math.round(cho);
};


const getweelkyMacroDistribution = (data) => {
  let distribution = []; //pro, fat, cho
  let n = 0;
  data.forEach((item) => {
    let x = 0;

    if (item.length > 7) {
      item.slice(Math.max(item.length - 7, 1))
    }

    x = item.reduce(function(prev, cur) {
      return Number(prev) + Number(cur.y);
    }, 0);

    distribution.push(x);

    n = item.length;
  })

  distribution.push(n)

  return distribution;
};


//in grams
const getProteinWeeklyAverage = (macros) => {
  let x = macros[0] / macros[3];
  return x;
};


//in grams
const getFatWeeklyAverage = (macros) => {
  let x = macros[1] / macros[3];
  return x;
};


//in grams
const getCarbsWeeklyAverage = (macros) => {
  let x = macros[2] / macros[3];
  return x;
};

const getCalorieWeeklyAverage = (macros) => {
  let x = (macros[0] * 4) + (macros[1] * 9) / macros[3];
  return x;
}


//gets hunger data, based on number of days we care about, and the index of that dataset (index 0 is hunger before and 1 is hungr after)
const getHunger = (data, n, i) => {
  let sum = 0;

  if (!data[i]) return 'No Data'

  if (data[i].length < n) {
    n = data[i].length;
  }

  sum += data[i].reduce(function(prev, cur) {
    return Number(prev) + Number(cur.y);
  }, 0);

  const avg = (Math.round(sum / n * 10) / 10).toFixed(1)

  return avg;
};


//get today's daye in string format ('yyyy-mm-dd')
const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const calculateDifferenceInDays = (dateStr1, dateStr2) => {
  const date1 = parse(dateStr1, 'yyyy-MM-dd', new Date());
  const date2 = parse(dateStr2, 'yyyy-MM-dd', new Date());

  const numDays = differenceInDays(date2, date1);

  return numDays;
}

const getEntryCount = (mood) => {
  let sum = 0;

  for (const key of mood) {
    for (const i in key) {
      let j = Object.values(key[i])
      sum += j.reduce((x, y) => Number(x) + Number(y), 0);

    }
  }

  return sum;
}



const getTopThreeMoods = (feelingsArr) => {
  if (!feelingsArr[0]) return;

  const allFeelings = feelingsArr.reduce((acc, curr) => {
    const currFeelings = Object.keys(curr).filter((key) => key !== "id").map((date) => curr[date]);
    currFeelings.forEach((feelings) => {
      Object.entries(feelings).forEach(([feeling, count]) => {
        const numCount = Number(count);
        if (acc[feeling] === undefined) {
          acc[feeling] = numCount;
        } else {
          acc[feeling] += numCount;
        }
      });
    });
    return acc;
  }, {});

  const sortedFeelings = Object.entries(allFeelings).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const top3Feelings = [
    { mood: sortedFeelings[0][0], count: sortedFeelings[0][1] },
    { mood: sortedFeelings[1][0], count: sortedFeelings[1][1] },
    { mood: sortedFeelings[2][0], count: sortedFeelings[2][1] },
  ];

  return top3Feelings;
};



export {
  getMaintenanceCalories,
  getTargetCalories,
  getProtein,
  getFat,
  getCarbs,
  getweelkyMacroDistribution,
  getCarbsWeeklyAverage,
  getFatWeeklyAverage,
  getProteinWeeklyAverage,
  getHunger,
  getTopThreeMoods,
  getTodaysDate,
  getCalorieWeeklyAverage,
  getEntryCount
};
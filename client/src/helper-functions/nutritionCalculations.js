const getMaintenanceCalories = (w, bf) => {
  const cal =  370 + (9.8 * w * (100 - bf) / 100 ) * 1.5;
  return Math.round(cal);
};

const getTargetCalories = (wpwc, maintenance) => {
  const cal = maintenance + (wpwc * 3500 / 7);
  return Math.round(cal);
};

const getProtein = (weight, sx, bf ) => {
  let multiplier = 0;
  if (sx === 'male') {
    if(bf <= 20) {
      multiplier = 1;
    } else if(bf <= 25) {
      multiplier = 0.8;
    } else {
      multiplier = 0.73;
    }
  }

  if (sx !== 'male') {
    if(bf <= 25) {
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
    if(bf < 25) {
      multiplier = 0.22;
    } else {
      multiplier = 0.25;
    }
  };

  if(sx !== 'male') {
    multiplier = 0.3;
  };

  const fat = weight * multiplier;
  return Math.round(fat);
};

const getCarbs = (cal, pro, fat) => {
  const cho = [cal-(pro*4)-(fat*9)]/4
  return Math.round(cho);
};

export { getMaintenanceCalories, getTargetCalories, getProtein, getFat, getCarbs };
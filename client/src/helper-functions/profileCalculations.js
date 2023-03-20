
const bodyFatCalcHelper = (sx, waist, neck, hght, hip) => {

  if (sx === "male") {
    const result = Math.round(495 / ( 1.0324 - 0.19077 * Math.log10( waist - neck ) + 0.15456 * Math.log10( hght ) ) - 450);

    if (result === Infinity || !result) return;

    return result;
  };

  if (sx !== "male") {
    
    const result = Math.round(495 / ( 1.0324 - 0.19077 * Math.log10( waist - neck ) + 0.15456 * Math.log10( hght ) ) - 450);

    if (result === Infinity || !result || result <= 0) return;

    return result + 10;
  };
};


const targetWeightChangeHelper = (bf, weight, goal, sx) => {
  if (goal === "maintain") return 0;

  if (sx === "male") {
    if (goal === "loseFat") {
      if (bf >= 15) return Math.round(weight * -0.007 * 10) / 10;
      if (bf >= 12) return Math.round(weight * -0.005 * 10) / 10;
      if (bf < 12) return Math.round(weight * -0.003 * 10) / 10;
    };
    if (goal === "buildMuscle") {
      if (bf >= 20) return Math.round(weight * -0.007 * 10) / 10;
      return Math.round(weight * 0.0025 * 10) / 10;
    };
  };

  if (sx !== "male") {
    if (goal === "loseFat") {
      if (bf >= 25) return Math.round(weight * -0.007 * 10) / 10;
      if (bf >= 22) return Math.round(weight * -0.005 * 10) / 10;
      if (bf < 22) return Math.round(weight * -0.003 * 10) / 10;
    };
    if (goal === "buildMuscle") {
      if (bf >= 30) return Math.round(weight * -0.007 * 10) / 10;
      return Math.round(weight * 0.0025 * 10) / 10;
    };
  };

  return "err";
}

export { bodyFatCalcHelper, targetWeightChangeHelper };
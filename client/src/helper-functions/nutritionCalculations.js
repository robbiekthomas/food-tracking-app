const getMaintenanceCalories = (wpwc) => {
  const result = wpwc * 3500 / 7
  console.log(wpwc);
  return result;
};

const getTargetCalories = () => {
  return 1;
};

const getProtein = () => {
  return 1;
};

const getFat = () => {
  return 1;
};

const getCarbs = () => {
  return 1;
};

export { getMaintenanceCalories, getTargetCalories, getProtein, getFat, getCarbs };
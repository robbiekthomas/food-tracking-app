import React from "react";
import HabitCard from "../components/charts/HabitCard";
import SideBar from "./SideBar";
import ChartHeader from "./charts/ChartsHeader";
import LineChart from "./charts/LineChart";
import PieChart from "../components/charts/PieChart";
import Stacked from "../components/charts/Stacked";
import Card from "./charts/Card";
import classNames from "classnames";
import ViewSwitch from "./ViewSwitch";

const DashboardPrecise = ({
  currentHabits,
  inputs,
  setUserInputs,
  setCurrentHabits,
  targetCalories,
  protein,
  carbs,
  fat,
  barChartData,
  lineChartData,
  weelkyMacroDistribution,
  proteinWeeklyAverage,
  fatWeeklyAverage,
  carbsWeeklyAverage,
  calorieWeeklyAverage,
  date,
}) => {
  const gradientStyling =
  "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";

  return (
    <div className="flex bg-primary">
      {/*Sidebar*/}
      {currentHabits.length > 0 && (
        <SideBar
          inputs={inputs}
          setUserInputs={setUserInputs}
          currentHabits={currentHabits}
          setCurrentHabits={setCurrentHabits}
        />
      )}
      {/*Nutrition Targets (top cards on dashboard)*/}

      <div className="w-3/4 ml-4 mr-4 pt-3 ">
        <ViewSwitch
          date={date}
          goal={inputs.main_goal}
          view1="All Time"
          view2="Last 30 Days"
          view3="Last 7 Days"
        />
        <div
          className={classNames(
            "w-full",
            "grid",
            "grid-cols-3",
            "grid-rows-2, gap-3"
          )}
        >
          <Card
            title="Calories"
            color="#666666"
            target={`${targetCalories - 100} - ${targetCalories + 100} kcal`}
            performance={Math.round(
              (calorieWeeklyAverage / targetCalories) * 100
            )}
          />

          <Card
            title={"Protein"}
            target={`${protein - 10} - ${protein + 10} grams`}
            unit="grams"
            color="#CB4141"
            performance={Math.round((proteinWeeklyAverage / protein) * 100)}
          />

          <div className={`shadow-sm relative rounded-lg row-span-2 text-dimWhite align-center px-2 ${gradientStyling}`}>
            <ChartHeader title={"Macronutrient Distribution"} />

            <div className="flex justify-around">
              <div className="w-5/12">
                <PieChart
                  title="Target"
                  series={[protein, fat, carbs]}
                  labels={["Protein (%)", "Fat (%)", "Carbohydrates (%)"]}
                />
              </div>
              {/* Actual Macro Distribution From Diet */}
              <div className="w-5/12">
                <PieChart
                  title="Actual"
                  series={[
                    weelkyMacroDistribution[0] * 4,
                    weelkyMacroDistribution[1] * 9,
                    weelkyMacroDistribution[2] * 4,
                  ]}
                  labels={["Protein (%)", "Fat (%)", "Carbohydrates (%)"]}
                />
              </div>
            </div>
          </div>

          <Card
            title={"Carbohydrates"}
            target={`${carbs - 10} - ${carbs + 10} grams`}
            unit="grams"
            color="#feaf1a"
            performance={Math.round((carbsWeeklyAverage / carbs) * 100)}
          />

          <Card
            title={"Fat"}
            target={`${fat - 10} - ${fat + 10} grams`}
            unit="grams"
            color="#00e396"
            performance={Math.round((fatWeeklyAverage / fat) * 100)}
          />
        </div>

        <div className="mt-3">
          <div className={classNames("w-full", "grid", "grid-cols-2", "gap-3")}>
            {/* LINE CHART FOR WEIGHT AND BODY FAT */}
            {lineChartData && lineChartData.length > 0 && (
              <div
                className={`col-span-1 row-span-2 shadow-sm relative rounded-lg align-center pb-2 pt-3 w-full ${gradientStyling} ${classNames(
                  "col-span-1",
                  
                )}`}
              >
                <LineChart datapoints={lineChartData} />
              </div>
            )}

            <div
              className={classNames(
                "col-span-1",
                "grid",
                "grid-rows-2",
                "gap-3"
              )}
            >
              {/* MACRONUTRIENTS OVER TIME STACKED CHART */}
              {barChartData && barChartData.length > 0 && (
                <div
                  className={`shadow-sm relative rounded-lg align-center pb-2 pt-2 pr-3 ${gradientStyling} ${classNames(
                    "row-span-1"
                  )}`}
                >
                  <ChartHeader title="Macronutrients (grams per day)" />
                  <Stacked
                    data={barChartData}
                    name1="protein"
                    name2="fat"
                    name3="carbs"
                  />
                </div>
              )}
              {/* HABIT GOALS*/}
              {currentHabits && currentHabits.length > 0 && (
                <div
                  className={`shadow-sm relative rounded-lg pl-5 pr-5 ${gradientStyling} ${classNames(
                    "row-span-1"
                  )}`}
                >
                  <HabitCard dataSource={currentHabits} title="Habit Goals" />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPrecise;

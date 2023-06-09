import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = ({ title, target, performance, color }) => {
  //color will change to be more vibrant to less vibrant as they get closer/farther from the target
  let pathValue = performance;
  let textColor = `rgba(255, 255, 255, 0.4)`;

  if (performance > 100) {
    pathValue = 200 - performance;
  }

  let hungerColor = "";
  if (performance < 3) {
    hungerColor = "#ffb114";
  } else if (performance > 8) {
    hungerColor = "#ffa645";
  } else {
    hungerColor = "#1dcc2e";
  }

  //color will change to gold if there is a score within 10%
  let text = `${performance}%`;
  let textSize = "25px";

  if (Math.abs(performance - 100) <= 10) {
    color = "#fece21";
    text = "\u2605";
    textSize = "45px";
    textColor = "#fece21";
  }

  // //customize colors
  // const hex = color.replace('#', '');

  // // Convert the hex color code to a decimal value
  // const r = parseInt(hex.substring(0, 2), 16);
  // const g = parseInt(hex.substring(2, 4), 16);
  // const b = parseInt(hex.substring(4, 6), 16);

  return (
    <div className="shadow-sm relative flex-col  break-words text-dimWhite rounded-lg bg-clip-border bg-gradient-to-r from-[#f8fafc]/[0.1] via-[#f8fafc]/[0.02] to-[#f8fafc]/[0.1] border-t-2 border-b-2 border-[#f8fafc]/[0.1] z-10 ">
      <div className="flex-column pl-1 pr-1 pt-2 pb-2 justify-center items-center">
        <div className="flex flex-wrap">
          {title !== "Maintenance Calories" &&
            title !== "Hunger Before Eating" &&
            title !== "Hunger After Eating" && (
              <div className="flex-none w-2/3 max-w-full px-5">
                <div>
                  <p className="opacity-75 mb-2 font-sans font-semibold leading-normal text-l">
                    {title}
                  </p>
                  <div className="flex justify-between">
                    <div className="flex">
                      <h5 className="mb-0 text-s">
                        <strong>{target}</strong>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {(title === "Maintenance Calories" ||
            title === "Hunger Before Eating" ||
            title === "Hunger After Eating") && (
            <div className="flex justify-between w-full items-center max-w-full px-5">
              <div className="flex flex-col">
                <p className="opacity-75 mb-2 font-sans font-semibold leading-normal text-l">
                  {title}
                </p>
                <h5 className="mb-0 text-s">{target}</h5>
              </div>

              <div
                className="bold mb-0 text-3xl"
                style={{ color: hungerColor }}
              >
                {performance}
              </div>
            </div>
          )}

          {title !== "Maintenance Calories" &&
            title !== "Hunger Before Eating" &&
            title !== "Hunger After Eating" && (
              <div style={{ width: 60, height: 60 }}>
                <CircularProgressbar
                  variant="success"
                  value={pathValue}
                  text={text}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: textSize,
                    pathTransitionDuration: 0.5,
                    pathColor: color,
                    textColor: textColor,
                    backgroundColor: color,
                    trailColor: "rgba(255,255,255, 0.3)",
                  })}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;

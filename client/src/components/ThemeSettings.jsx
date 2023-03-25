import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { robot } from "../assets";

import { useStateContext } from "../contexts/ContextProvider";

const themecolors = [
  {
    name: "Uranus",
    color: "#99e3f2",
    image: "https://nineplanets.org/wp-content/uploads/2019/09/uranus.png",
  },
  {
    name: "Jupiter",
    color: "#b07954",
    image:
      "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/DK_192970_jupiter_aw_wbzzsf.jpg",
  },
  {
    name: "Mercury",
    color: "#757473",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    name: "Mars",
    color: "#ed653b",
    image:
      "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Mars_ICE_CAP_BACK0000_ozkwko.jpg",
  },
  {
    name: "Neptune",
    color: "#1f45f0",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Neptune_cutout.png/776px-Neptune_cutout.png",
  },
  {
    name: "Venus",
    color: "#ed8611",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Venus_globe_-_transparent_background.png",
  },
  {
    name: "Saturn",
    color: "#f0ca89",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Saturnx.png/1200px-Saturnx.png",
  },
];

const ThemeSettings = () => {
  const { setColor, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-o right-0 z-50">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">Planet Themes</p>
          <div className="flex gap-3">
            {themecolors.map((item, index) => (
              <TooltipComponent
                key={index}
                content={item.name}
                position="TopCenter"
              >
                <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundPosition: "center",
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundSize: "cover",
                    }}
                    onClick={() => setColor(item.color)}
                  >
                    <BsCheck
                      className={`ml-2 text-2xl text-white ${
                        item.color === currentColor ? "block" : "hidden"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-center">{item.name}</p>
              </TooltipComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

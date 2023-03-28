import React from "react";
import styles from "../style";
import { discount, robot } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";
import foodPlanet from "../assets/foodPlanet.png";
import { Box } from "@mui/system";
import earthbg from "../assets/bg/earthbg.png"

const Home = () => {
  const { currentMode } = useStateContext();

  return (
    <section
      id="home"
      className={`flex flex-col items-stretch ${styles.paddingY}  ${styles.flexCenter}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 ml-10`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 mt-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />

          <p className={`${styles.paragraph} ml-2`}>
            The <span className="text-white">Sky </span>
            is <span className="text-white">not </span> the limit
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Generation</span>{" "}
            <br className="sm:block hidden" />
            of Food Tracking
          </h1>
        </div>
        <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
          Our team of experts uses a methodology to identify your nutrition
          tracking needs by allowing for a flexible tracking applicaiton that
          suits your everyday life.
        </p>
      </div>
      <Box
        position="fixed"
        bottom={20}
        sx={{ zIndex: -1, width: "100vw", height: "100vh" }}
      >
        <img src={earthbg} alt="mercury" />
      </Box>
    </section>
  );
};

export default Home;

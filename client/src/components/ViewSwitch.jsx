import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ViewSwitch({ view1, view2, view3, goal, date }) {
  return (
    <div className="mb-3 grid grid-cols-3 grid-rows-1 gap-3 font-bold text-white ">
      <div className="flex justify-center pt-1 pb-1 align-center  rounded-lg text-dimWhite bg-gradient-to-r from-[#f8fafc]/[0.1] via-[#f8fafc]/[0.02] to-[#f8fafc]/[0.1] border-t-2 border-b-2 border-[#f8fafc]/[0.1] z-10">
        Current Goal: {goal}
      </div>
      {/* <ButtonGroup sx={{ width: "00px" }} aria-label="Basic example">
        <Button
          className=" hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-l text-dimWhite w-1/3 bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.1]"
          variant="secondary"
        >
          {view1}
        </Button>
        <Button
          className=" hover:bg-gray-300 py-1 px-2 text-dimWhite w-1/3 bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.1]"
          variant="secondary"
        >
          {view2}
        </Button>
        <Button
          className=" hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-r text-dimWhite w-1/3 bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.1]"
          variant="secondary"
        >
          {view3}
        </Button>
      </ButtonGroup> */}
      <div className="flex justify-center pt-1 pb-1 align-center  rounded-lg text-dimWhite bg-gradient-to-r from-[#f8fafc]/[0.1] via-[#f8fafc]/[0.02] to-[#f8fafc]/[0.1] border-t-2 border-b-2 border-[#f8fafc]/[0.1] z-10">
        Weekly View
      </div>
      <div className="flex justify-center pt-1 pb-1 align-center rounded-lg  text-dimWhite bg-gradient-to-r from-[#f8fafc]/[0.1] via-[#f8fafc]/[0.02] to-[#f8fafc]/[0.1] border-t-2 border-b-2 border-[#f8fafc]/[0.1] z-10">
        {date}
      </div>
    </div>
  );
}

export default ViewSwitch;

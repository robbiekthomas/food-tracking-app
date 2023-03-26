import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ViewSwitch({ view1, view2, view3, goal, date }) {
  return (
    <div className="mb-3 grid grid-cols-3 grid-rows-1 gap-3 font-bold text-gray-700 ">
      <div className="flex justify-center pt-1 pb-1 align-center bg-gray-200 rounded-lg bg-secondary text-dimWhite">
        Current Goal: {goal}
      </div>
      <ButtonGroup sx={{ width: "00px" }} aria-label="Basic example">
        <Button
          className=" hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-l bg-secondary text-dimWhite w-1/3"
          variant="secondary"
        >
          {view1}
        </Button>
        <Button
          className=" hover:bg-gray-300 py-1 px-2 bg-secondary text-dimWhite w-1/3"
          variant="secondary"
        >
          {view2}
        </Button>
        <Button
          className=" hover:bg-gray-300 text-gray-700 py-1 px-2 rounded-r bg-secondary text-dimWhite w-1/3"
          variant="secondary"
        >
          {view3}
        </Button>
      </ButtonGroup>
      <div className="flex justify-center pt-1 pb-1 align-center bg-gray-200 rounded-lg bg-secondary text-dimWhite">
        {date}
      </div>
    </div>
  );
}

export default ViewSwitch;

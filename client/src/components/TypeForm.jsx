import React from "react";
import { PopupButton } from "@typeform/embed-react";
import { Button } from "@mui/material";
import axios from "axios";

const TypeForm = () => {
  const submitForm = () => {
    axios.get("http://localhost:8000/api/dashboard/responses").then((res) => {
      console.log(res.data);
      return axios
        .post("http://localhost:8000/api/dashboard/typeform/insert", res.data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
  };

  return (
    <div>
      <PopupButton
        id="https://0qppjq7l5lu.typeform.com/to/Q8mDLDts"
        style={{ fontSize: 20 }}
        className="my-button"
      >
        Getting Started Form
      </PopupButton>
      <Button variant="contained" onClick={() => submitForm()}>
        Continue
      </Button>
    </div>
  );
};

export default TypeForm;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Button } from "@mui/material";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [identifier, setIdentifier] = useState(user ? user.sub : "");

  useEffect(() => {
    userCheck();
    console.log(identifier);
  }, [isAuthenticated]);

  const userCheck = () => {
    axios.get("http://localhost:8000/api/dashboard/").then((res) => {
      if (
        !res.data.find((element) => element.sub === (user ? user.sub : null))
      ) {
        updateDatabase(user);
        setIdentifier(user ? user.sub : "");
        //  set mode to form mode
      } else {
        setIdentifier(user ? user.sub : "");
        //  set mode to dashboard mode
      }
    });
  };

// add user to db
  const updateDatabase = (values) => {
    const url = "http://localhost:8000/api/dashboard/user/new";

    axios
      .post(url, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("axios", err);
      });
  };

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {JSON.stringify(user, null, 2)}

        <Button variant="contained" onClick={() => userCheck()}>
          setState
        </Button>
      </div>
    )
  );
};

export default UserProfile;

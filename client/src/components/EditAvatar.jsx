import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";
import Avatar4 from "../assets/avatar4.png";
import Avatar5 from "../assets/avatar5.png";
import Avatar6 from "../assets/avatar6.png";
import Avatar7 from "../assets/avatar7.png";
import Avatar8 from "../assets/avatar8.png";
import { useLoginContext } from "../contexts/login-status";
import { useStateContext } from "../contexts/ContextProvider";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import mercury from "../assets/planets/mercury.png";
import earth from "../assets/planets/earth.png";
import jupiter from "../assets/planets/jupiter.png";
import mars from "../assets/planets/mars.png";
import neptune from "../assets/planets/neptune.png";
import saturn from "../assets/planets/saturn.png";
import uranus from "../assets/planets/uranus.png";
import venus from "../assets/planets/venus.png";
import venusbg from "../assets/bg/venusbg.png";
import earthbg from "../assets/bg/earthbg.png";
import jupiterbg from "../assets/bg/jupiterbg.png";
import mercurybg from "../assets/bg/mercurybg.png";
import marsbg from "../assets/bg/marsbg.png";
import neptunebg from "../assets/bg/neptunebg.png";
import saturnbg from "../assets/bg/saturnbg.png";
import uranusbg from "../assets/bg/uranusbg.png";

export default function EditAvatar() {
  const [open, setOpen] = useState(false);
  const { avatar, setAvatar } = useLoginContext();
  const { setColor, currentColor, setThemeSettings } = useStateContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const avatars = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
  ];

  const changeAvatar = (avatar) => {
    setAvatar(avatar);
    localStorage.setItem("avatar", avatar);
  };

  const themecolors = [
    {
      name: "Uranus",
      color: "#99e3f2",
      image: uranus,
      background: uranusbg,
    },
    {
      name: "Jupiter",
      color: "#b07954",
      image: jupiter,
      background: jupiterbg,
    },
    {
      name: "Mercury",
      color: "#757473",
      image: mercury,
      background: mercurybg,
    },
    {
      name: "Mars",
      color: "#ed653b",
      image: mars,
      background: marsbg,
    },
    {
      name: "Neptune",
      color: "#1f45f0",
      image: neptune,
      background: neptunebg,
    },
    {
      name: "Venus",
      color: "#ed8611",
      image: venus,
      background: venusbg,
    },
    {
      name: "Saturn",
      color: "#f0ca89",
      image: saturn,
      background: saturnbg,
    },
    {
      name: "Earth",
      color: "#65a30d",
      image: earth,
      background: earthbg,
    },
  ];

  return (
    <div className="">
      <Button onClick={handleClickOpen} sx={{}}>
        Settings
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Choose a new Alien!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We hope you feel right at home with these options.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              "justify-content": "space-between",
              "margin-top": "20px",
            }}
          >
            {avatars.map((avatar, index) => {
              return (
                <Box
                  key={index}
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    cursor: "pointer",
                  }}
                  src={avatar}
                  onClick={() => changeAvatar(avatar)}
                />
              );
            })}
          </Box>
        </DialogContent>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">Planet Themes</p>
          <p>Choose a planet to live on!</p>
          <div className="flex justify-around">
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
                      width: "5rem",
                      height: "5rem",
                      backgroundSize: "cover",
                    }}
                    onClick={() =>
                      setColor(item.color, item.image, item.background)
                    }
                  >
                    <BsCheck
                      className={`ml-4 text-5xl text-white ${
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

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

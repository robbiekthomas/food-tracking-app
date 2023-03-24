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


export default function EditAvatar() {
  const [open, setOpen] = useState(false);
  const { avatar, setAvatar } = useLoginContext();

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
  }

  return (
    <div className="m-4">
      <Button variant="outlined" onClick={handleClickOpen} sx={{'margin-bottom': '20px'}}>
        Edit Avatar
      </Button>
      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{ width: 200, height: 200, margin: "auto" }}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Choose a new Alien!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We hope you feel right at home with these options.
          </DialogContentText>
          <Box sx={{ display: "flex", "justify-content": "space-between", 'margin-top': '20px' }}>
            {avatars.map((avatar) => {
              return (
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  src={avatar}
                  onClick={() => changeAvatar(avatar)}
                />
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

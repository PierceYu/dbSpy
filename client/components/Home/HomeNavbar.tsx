import React from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";



export default function HomeNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#2b3a42" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="https://user-images.githubusercontent.com/83368864/180262147-578ebc6b-2a24-4795-ba09-37a6d43db6fd.png" alt="Logo" />
          </Typography>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/signup"}
          >
            <Button color="inherit">Free Demo</Button>
          </Link>

          <Button 
            color="inherit">
            <a style={{ textDecoration: "none", color: "white" }}
            href="https://www.github.com/oslabs-beta/dbSpy/blob/dev/README.md">Docs</a>
            
          </Button>
          
          {/* <Button color="inherit">Team</Button> */}

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/signup"}
          >
            <Button color="inherit">Sign Up</Button>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/login"}
          >
            <Button color="inherit">Log In</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

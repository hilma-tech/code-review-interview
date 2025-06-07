import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

import { HEBREW } from "../hebrew";

import { Page } from "./Page";

export function NavigationBar() {
  return (
    <Page>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {HEBREW.websiteTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Page>
  );
}

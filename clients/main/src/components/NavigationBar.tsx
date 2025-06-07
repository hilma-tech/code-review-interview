import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { useLogoutMutation } from "@hilma/auth-client";

import { HEBREW } from "../hebrew";

import { Page } from "./Page";

export function NavigationBar() {
  const logoutMutation = useLogoutMutation("/api/auth/logout");

  return (
    <Page>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {HEBREW.websiteTitle}
          </Typography>
          <Button color="inherit" onClick={() => logoutMutation.mutate()}>
            {HEBREW.logout}
          </Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Page>
  );
}

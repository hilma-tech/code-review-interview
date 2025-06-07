import { useAuthData, withAuth } from "@hilma/auth-client";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { HEBREW } from "../hebrew";

export const DepartmentsPage = withAuth(
  function DepartmentsPage() {
    const navigate = useNavigate();
    const authData = useAuthData();

    return (
      <Stack component="main" sx={{ p: "1rem" }}>
        {authData.roles.includes("ADMIN") && (
          <Button
            variant="contained"
            sx={{ alignSelf: "end", ["& .MuiButton-icon"]: { m: 0 } }}
            onClick={() => navigate("/add-department")}
            startIcon={<AddIcon />}
          >
            {HEBREW.addDepartment}
          </Button>
        )}
        TODO
      </Stack>
    );
  },
  { access: "private" },
);

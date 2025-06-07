import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { HEBREW } from "../hebrew";

export function DepartmentsPage() {
  const navigate = useNavigate();

  return (
    <Stack component="main" sx={{ p: "1rem" }}>
      <Button
        variant="contained"
        sx={{ alignSelf: "end", ["& .MuiButton-icon"]: { m: 0 } }}
        onClick={() => navigate("/add-department")}
        startIcon={<AddIcon />}
      >
        {HEBREW.addDepartment}
      </Button>
      TODO
    </Stack>
  );
}

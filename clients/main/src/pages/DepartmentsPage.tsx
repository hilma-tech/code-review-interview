import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { HEBREW } from "../hebrew";
import { StyledInput } from "../components/StyledInput";

export function DepartmentsPage() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<
    { departmentCode: string; name: string; id: number; roomsCount: number }[]
  >([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [highlightedDepartments, setHighlightedDepartments] = useState<
    {
      departmentCode: string;
      name: React.ReactNode;
      id: number;
      roomsCount: number;
    }[]
  >(departments);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- need to send to server
    (async () => {
      const { data } = await axios.get(
        `/api/department?search=${search}&page=${page}&limit=15`,
      );
      setDepartments(data);
      setHighlightedDepartments(
        departments.map((department) => ({
          ...department,
          name: department.name
            .replace(search, `<b>${search}<b>`)
            .split("<b>")
            .map((part, i) =>
              i % 2 === 0 ? (
                part
              ) : (
                <span key={i} style={{ fontWeight: "bold" }}>
                  {part}
                </span>
              ),
            ),
        })),
      );
    })();
  }, [search, page]);

  return (
    <Stack component="main" sx={{ p: "16px" }}>
      <Stack direction="row" style={{ marginBottom: "1rem" }}>
        <Stack direction="row" style={{ flexGrow: 1 }}>
          <StyledInput
            placeholder="חיפוש"
            endAdornment={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginLeft: "16px" }}
          />

          <p style={{ marginTop: "10px" }}>{departments.length} תוצאות</p>
        </Stack>
        <Button
          variant="contained"
          sx={{ alignSelf: "end", ["& .MuiButton-icon"]: { m: 0 } }}
          onClick={() => navigate("/add-department")}
          startIcon={<AddIcon />}
        >
          {HEBREW.addDepartment}
        </Button>
      </Stack>

      <table style={{ background: "white" }}>
        <thead>
          <th
            style={{
              color: "black",
              padding: "10px",
              border: "1px solid black",
              textAlign: "right",
            }}
          >
            שם
          </th>
          <th
            style={{
              color: "black",
              padding: "10px",
              border: "1px solid black",
              textAlign: "right",
            }}
          >
            קוד
          </th>
          <th
            style={{
              color: "black",
              padding: "10px",
              border: "1px solid black",
              textAlign: "right",
            }}
          >
            מספר חדרים
          </th>
        </thead>

        <tbody>
          {highlightedDepartments.map((department, i) => (
            <tr key={i}>
              <td
                style={{
                  color: "black",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                {department.name}
              </td>
              <td
                style={{
                  color: "black",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                {department.departmentCode ?? "-"}
              </td>
              <td
                style={{
                  color: "black",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                {department.roomsCount}
              </td>
              <td
                style={{
                  color: "black",
                  border: "1px solid black",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/edit-department/${department.id}`);
                }}
              >
                עריכה
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Stack direction="row" style={{ marginTop: "16px" }}>
        <ArrowForwardIcon
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
        />
        <ArrowBackIcon
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={() => setPage(page + 1)}
        />
      </Stack>
    </Stack>
  );
}

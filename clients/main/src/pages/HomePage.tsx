import { withAuth } from "@hilma/auth-client";
import Box from "@mui/material/Box";

export const HomePage = withAuth(
  function HomePage() {
    return (
      <Box component="main" sx={{ p: "1rem" }}>
        Hello!
      </Box>
    );
  },
  { access: "private" },
);

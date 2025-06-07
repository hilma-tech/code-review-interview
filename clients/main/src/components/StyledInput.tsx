import Input, { type InputProps } from "@mui/material/Input";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";

const inputSx = {
  height: "46px",
  border: "1px solid",
  color: (theme) => theme.palette.primary.main,
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.45),
  borderRadius: "4px",
  px: "1rem",
  transition: "border-color 300ms",
  ["&:hover, &.Mui-focused"]: {
    borderColor: (theme) => theme.palette.primary.main,
  },
  ["&.Mui-focused"]: {
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
  },
  ["&.Mui-error"]: {
    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
    borderColor: (theme) => theme.palette.error.main,
  },
} as SxProps<Theme>;

export function StyledInput({ sx = [], ...rest }: InputProps) {
  return (
    <Input
      disableUnderline
      {...rest}
      sx={[inputSx, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}

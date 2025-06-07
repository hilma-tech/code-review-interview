import Stack, { type StackProps } from "@mui/material/Stack";

export function Page({ sx = [], ...rest }: StackProps) {
  return (
    <Stack
      {...rest}
      sx={[
        { height: "100%", width: "100%" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

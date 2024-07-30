import { Box, Stack } from "@mui/material";

const item = ["tomato", "potato", "garlic", "ginger", "carrot"];
export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width="800px" height="600px" spacing={2}></Stack>
    </Box>
  );
}

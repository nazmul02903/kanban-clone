import { Box, Button, Divider, Typography } from "@mui/material";
const Kanban = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button size='small'>Add Section</Button>
        <Typography variant="body2" fontWeight="700">
          5 sections
        </Typography>
      </Box>
      <Divider sx={{ marginY: 1 }} />
    </>
  );
};

export default Kanban;

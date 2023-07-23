import {
  Box,
  Divider,
  Icon,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Drawer as MuiDrawer,
  Stack,
  Toolbar,
} from "@mui/material";
import { FC } from "react";
import AddBot from "../discord/AddBot";

const Drawer: FC<{ width: number; open: boolean; toggleOpen: () => void }> = ({
  width,
  open,
  toggleOpen,
}) => {
  const content = (
    <Stack>
      <Toolbar sx={{ justifyContent: "flex-end", display: { sm: "none" } }}>
        <IconButton aria-label="close drawer" onClick={toggleOpen}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
      <Divider />

      <AddBot />
      <Divider />

      <MenuList>
        <Link href="/scenarios" underline="none">
          <MenuItem>シナリオ</MenuItem>
        </Link>
      </MenuList>
    </Stack>
  );

  return (
    <Box
      aria-label="menu"
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
    >
      <MuiDrawer
        open={open}
        onClose={toggleOpen}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {content}
      </MuiDrawer>

      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {content}
      </MuiDrawer>
    </Box>
  );
};
export default Drawer;

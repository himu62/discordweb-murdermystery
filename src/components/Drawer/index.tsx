import { FC, useState } from "react";
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  Icon,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
} from "@mui/material";
import ProfileSelector from "@/src/components/Drawer/ProfileSelector";
import SessionLinks from "@/src/components/Drawer/SessionLinks";

const Drawer: FC<{ width: number }> = ({ width }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const content = (
    <Stack>
      <Toolbar sx={{ justifyContent: "flex-end", display: { xs: "none" } }}>
        <IconButton aria-label="close drawer" onClick={toggleDrawer}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
      <Divider />

      <ProfileSelector />
      <Divider />

      <MenuList>
        <Link href="/scenarios" underline="none">
          <MenuItem>シナリオ一覧</MenuItem>
        </Link>
      </MenuList>
      <Divider />

      <SessionLinks />
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
        onClose={toggleDrawer}
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

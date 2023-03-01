import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  Icon,
  IconButton,
  Link,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { loadStore, Store } from "@/src/store";

const drawerWidth = 320;

const App: FC = () => {
  const [store, setStore] = useState<Store>(loadStore());

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: "dark" } })
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (store.profiles.length === 0) return;

    if (profile === "") {
      setProfile(store.profiles[0].id);
      return;
    }

    const profileIds = store.profiles.map((p) => p.id);
    if (!profileIds.includes(profile)) {
      setProfile(store.profiles[0].id);
      return;
    }
  }, [store.profiles]);

  const toggleDarkMode = (ev: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(ev.target.checked);
    if (ev.target.checked) {
      setTheme(createTheme({ palette: { mode: "dark" } }));
    } else {
      setTheme(createTheme({ palette: { mode: "light" } }));
    }
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const selectProfile = (event: SelectChangeEvent<string>) => {
    setProfile(event.target.value);
    // load profile
  };

  const profileMenuItems = store.profiles.map((pr) => (
    <MenuItem key={pr.id} value={pr.id}>
      {pr.name}
    </MenuItem>
  ));

  const drawer = (
    <>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton aria-label="close drawer" onClick={toggleDrawer}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
      <Divider />
      <Select
        id="select-profile"
        value={profile}
        onChange={selectProfile}
        label="プロフィール"
        sx={{ mt: 2 }}
      >
        {profileMenuItems}
      </Select>
      <Link>
        <Icon>edit</Icon>追加・編集
      </Link>
      <Divider />
      <List></List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              まだぼん
            </Typography>
            <Icon>light_mode</Icon>
            <Switch checked={isDarkMode} onChange={toggleDarkMode} />
            <Icon>dark_mode</Icon>
          </Toolbar>
        </AppBar>
        <Box
          aria-label="menu"
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar></Toolbar>
          <Typography>hogehoge</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default App;

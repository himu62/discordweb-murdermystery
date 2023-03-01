import {
  ChangeEvent,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { Profile, StoreContext, StoreContextProvider } from "@/src/store";

const drawerWidth = 320;

interface Props {
  children: ReactNode;
}

const App: FC<Props> = ({ children }) => {
  const { store } = useContext(StoreContext);

  const [isDarkMode, setIsDarkMode] = useState(store.darkMode);
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: isDarkMode ? "dark" : "light" } })
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();

  useEffect(() => {
    if (store.profiles.length === 0) return;

    if (!profile) {
      setProfile(store.profiles[0]);
      return;
    }

    const profileIds = store.profiles.map((p) => p.id);
    if (!profileIds.includes(profile.id)) {
      setProfile(store.profiles[0]);
      return;
    }
  }, [profile, store.profiles]);

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

  const selectProfile = (event: SelectChangeEvent) => {
    const p = store.profiles.filter((pr) => pr.id === event.target.value);
    if (p.length === 1) {
      setProfile(p[0]);
    }
  };

  const profileMenuItems = store.profiles.map((pr) => (
    <MenuItem key={pr.id} value={pr.id}>
      {pr.name}
    </MenuItem>
  ));

  const drawer = (
    <>
      <Toolbar sx={{ justifyContent: "flex-end", display: { xs: "none" } }}>
        <IconButton aria-label="close drawer" onClick={toggleDrawer}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
      <Divider />
      <Select
        id="select-profile"
        value={profile?.id ?? ""}
        onChange={selectProfile}
        label="プロフィール"
        sx={{ mt: 2 }}
      >
        {profileMenuItems}
      </Select>
      <Link href="/profiles">
        <Icon>edit</Icon>追加・編集
      </Link>
      <Divider />
      <List></List>
    </>
  );

  return (
    <StoreContextProvider>
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
              mt: 7,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </StoreContextProvider>
  );
};
export default App;

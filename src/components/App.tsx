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
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
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
  const {
    store: { darkMode, profiles },
  } = useContext(StoreContext);

  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: isDarkMode ? "dark" : "light" } })
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();

  useEffect(() => {
    if (profiles.size === 0) return;

    if (!profile) {
      setProfile(profiles.entries().next().value);
      return;
    }

    if (!profiles.has(profile.id)) {
      setProfile(profiles.entries().next().value);
      return;
    }
  }, [profile, profiles]);

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
    const p = profiles.get(event.target.value);
    if (p) {
      setProfile(p);
    }
  };

  const profileMenuItems = Array.from(profiles.values()).map((pr) => (
    <MenuItem key={pr.id} value={pr.id}>
      {pr.name}
    </MenuItem>
  ));

  const drawer = (
    <Stack>
      <Toolbar sx={{ justifyContent: "flex-end", display: { xs: "none" } }}>
        <IconButton aria-label="close drawer" onClick={toggleDrawer}>
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 1 }}>
        <FormControl margin="dense" size="small" fullWidth>
          <InputLabel htmlFor="select-profile">プロフィール</InputLabel>
          <Select
            id="select-profile"
            value={profile?.id ?? ""}
            onChange={selectProfile}
            label="プロフィール"
          >
            {profileMenuItems}
          </Select>
        </FormControl>
        <Button href="/profiles" variant="outlined">
          <Icon>edit</Icon>追加・編集
        </Button>
      </Box>
      <Divider />
      <List></List>
    </Stack>
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

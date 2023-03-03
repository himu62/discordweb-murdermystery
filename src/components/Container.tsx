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
import { StoreContext } from "@/src/store";

const drawerWidth = 320;

const Container: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { store, setStore } = useContext(StoreContext);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: "dark" } })
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState("");

  useEffect(() => {
    setCurrentProfileId(store.currentProfileId);
    setIsDarkMode(store.darkMode);
    const mode = store.darkMode ? "dark" : "light";
    setTheme(createTheme({ palette: { mode: mode } }));
  }, [store.currentProfileId, store.darkMode]);

  const toggleDarkMode = (ev: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(ev.target.checked);
    setStore({ ...store, darkMode: ev.target.checked });
    const mode = ev.target.checked ? "dark" : "light";
    setTheme(createTheme({ palette: { mode: mode } }));
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const selectProfile = (event: SelectChangeEvent) => {
    setCurrentProfileId(event.target.value);
    setStore({ ...store, currentProfileId: event.target.value });
  };

  const profileMenuItems = Array.from(store.profiles.values()).map((pr) => (
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
            value={currentProfileId ?? ""}
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
  );
};
export default Container;

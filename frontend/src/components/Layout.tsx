import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Icon,
  IconButton,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useStore } from "@/src/store";
import Drawer from "@/src/components/Drawer";

const DRAWER_WIDTH = 320;

const Layout: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { store, setStore } = useStore();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: "dark" } })
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsDarkMode(store.darkMode);
    const mode = store.darkMode ? "dark" : "light";
    setTheme(createTheme({ palette: { mode: mode } }));
  }, [store.darkMode]);

  const toggleDarkMode = (ev: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(ev.target.checked);
    setStore({ ...store, darkMode: ev.target.checked });
    const mode = ev.target.checked ? "dark" : "light";
    setTheme(createTheme({ palette: { mode: mode } }));
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider hideIconVariant>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { sm: `${DRAWER_WIDTH}px` },
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

          <Drawer width={DRAWER_WIDTH} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: 7,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            }}
          >
            {children}
          </Box>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
export default Layout;

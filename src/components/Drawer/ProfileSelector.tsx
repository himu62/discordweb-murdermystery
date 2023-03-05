import { FC, useEffect, useState } from "react";
import { useStore } from "@/src/store";
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const ProfileSelector: FC = () => {
  const { store, setStore } = useStore();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(store.currentProfileId);
  }, [store.currentProfileId, store.profiles]);

  const handleChange = (ev: SelectChangeEvent) => {
    setSelected(ev.target.value);
    setStore({ ...store, currentProfileId: ev.target.value });
  };

  const menuItems = Array.from(store.profiles.values()).map((pr) => {
    return (
      <MenuItem key={pr.id} value={pr.id}>
        {pr.name}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ p: 1 }}>
      <FormControl margin="dense" size="small" fullWidth>
        <InputLabel htmlFor="select-profile">プロフィール</InputLabel>
        <Select
          id="select-profile"
          value={selected}
          onChange={handleChange}
          label="プロフィール"
        >
          {menuItems}
        </Select>
      </FormControl>
      <Button href="/profiles" variant="outlined">
        <Icon>edit</Icon>追加・編集
      </Button>
    </Box>
  );
};
export default ProfileSelector;

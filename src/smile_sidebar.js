import { Drawer, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import {Link} from "react-router-dom"

export default function SmileSidebar() {
  const drawerWidth = 240;

  return (
    <Sidebar backgroundColor="#2196f3">
      <br></br>
      <Typography variant="h4" align="center"> SMILE </Typography>
      <br></br>
      <Menu>
        <MenuItem component={<Link to="/"/>}> Mein Portal </MenuItem>
        <SubMenu label="Mitglieder">
          <MenuItem component={<Link to="/search_users"/>}> Mitglied suchen</MenuItem>
          <MenuItem component={<Link to="/users"/>}> Migliedertabelle </MenuItem>
        </SubMenu>
        <SubMenu label="Verein">
          <MenuItem component={<Link to="/clubs"/>}> Vereinsdaten</MenuItem>
        </SubMenu>
        <MenuItem> Funktionäre </MenuItem>
        <MenuItem> Beiträge </MenuItem>
        <MenuItem> Kommunikation </MenuItem>
        <MenuItem> Administration </MenuItem>
        <MenuItem> Einstellungen </MenuItem>
      </Menu>
    </Sidebar>
  );
}

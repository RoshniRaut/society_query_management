import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SecurityIcon from '@mui/icons-material/Security';
import EventIcon from '@mui/icons-material/Event';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useCurrentProfile } from '../../Context/currentprofile.context';

export const NavList=() => {
  const {unseenEvent,unseenNotice}=useCurrentProfile();

  return(<React.Fragment>
    <NavLink to="history" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton  >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </NavLink>

    <NavLink to="query" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton >
      <ListItemIcon>
        <EngineeringSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Query" />
    </ListItemButton>
  </NavLink>
 
  <NavLink to="profile" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </NavLink>
  
  <NavLink to="maintenance" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton >
      <ListItemIcon>
        <CurrencyRupeeIcon />
      </ListItemIcon>
      <ListItemText primary="Maintenance" />
    </ListItemButton>
  </NavLink>


  <NavLink to="event" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton>
      <ListItemIcon>
      {unseenEvent!==0?<Badge badgeContent={unseenEvent} color="primary">
        <EventIcon />
        </Badge>:<EventIcon/>}
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItemButton>
  </NavLink>
    
  
  <NavLink to="notifications" style={{textDecoration: "none", color:"black"}}>
    <ListItemButton >
      <ListItemIcon>
        {unseenNotice+unseenEvent!==0?<Badge badgeContent={unseenNotice+unseenEvent} color="primary">
        <NotificationsIcon />
        </Badge>:<NotificationsIcon/>}
      </ListItemIcon>
      <ListItemText primary="Notifications"/>
    </ListItemButton>
  </NavLink>
  </React.Fragment>
)};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Other Services
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Calender" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LocalHospitalIcon />
      </ListItemIcon>
      <ListItemText primary="Medical app" />
    </ListItemButton>
    
  </React.Fragment>
);
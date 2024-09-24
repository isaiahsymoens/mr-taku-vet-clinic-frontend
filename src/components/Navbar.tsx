import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';

const drawerWidth = 240;

const navLinks = [
    {to: "Users", path: "users"},
    {to: "Visits", path: "visits"}
]

const Navbar: React.FC = () => {
    const [selectedNavItem, setSelectedNavItem] = useState<number>(0);
    const navigate = useNavigate();
    const location = useLocation();

    const isUserPage = location.pathname.includes("/users"); 

    useEffect(() => {
        setSelectedNavItem(isUserPage ? 0 : 1);
    }, []);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: "border-box"},
            }}
        >
            <Toolbar />
            <Box sx={{overflow: "auto"}}>
            <List>
                {navLinks.map((nav, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton 
                            selected={selectedNavItem === index} 
                            onClick={() => {
                                setSelectedNavItem(index);
                                navigate(nav.path);
                            }}
                        >
                        <ListItemIcon>
                            {index % 2 === 0 ? <PeopleAltIcon /> : <EventNoteIcon />}
                        </ListItemIcon>
                        <ListItemText primary={nav.to} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            </Box>
        </Drawer>
    );
}

export default Navbar;
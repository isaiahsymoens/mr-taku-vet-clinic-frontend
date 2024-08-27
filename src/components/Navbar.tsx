import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const drawerWidth = 240;

const navLinks = [
    {to: "Users", path: "users"},
    {to: "Visits", path: "visits"}
]

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <List>
                {navLinks.map((nav, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => navigate(nav.path)}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <PeopleAltIcon /> : <MailIcon />}
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
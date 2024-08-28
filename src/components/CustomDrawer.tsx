import { useState } from 'react';
import { Box, Button, Drawer, TextField, Typography } from '@mui/material';

type CustomDrawerProps = {
    open: boolean;
    onClose: () => void;
    onCancel: () => void;
    onSave: () => void;
    drawerHeader?: string;
    children: React.ReactNode;
}


const CustomDrawer: React.FC<CustomDrawerProps> = ({open, onClose, onCancel, onSave, drawerHeader, children}) => {
   
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 350, display: "flex", flexDirection: "column", gap: 2, padding: 3, marginTop: "48px" }}>
                <Typography variant="subtitle1">{drawerHeader}</Typography>
                {children}
                <Box>
                    <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" onClick={onSave}>Save</Button>
                </Box>
            </Box>
        </Drawer>
    );
}

export default CustomDrawer;
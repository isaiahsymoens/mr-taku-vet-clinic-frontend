import {Box, Button, Drawer, Typography} from '@mui/material';

export enum DrawerPanelActions {
    Add = "Add",
    Edit = "Edit",
    View = "View",
    Delete = "Delete"
}

type DrawerPanelProps = {
    open: boolean;
    onCancel: () => void;
    onSave: (e: React.FormEvent<HTMLFormElement>) => void;
    drawerHeader?: string;
    children: React.ReactNode;
    showBtn?: boolean;
}

const DrawerPanel: React.FC<DrawerPanelProps> = ({open, onCancel, onSave, drawerHeader, children, showBtn=true}) => {
    return (
        <Drawer anchor="right" open={open}>
            <Box sx={{width: 350, padding: 3, marginTop: "48px"}}>
                <Typography variant="subtitle1">{drawerHeader}</Typography>
                <form onSubmit={onSave}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2}}>
                        {children}
                        {showBtn ?
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button variant="outlined" onClick={onCancel} fullWidth>Cancel</Button>
                                <Button type="submit" variant="contained" fullWidth>Save</Button>
                            </Box>
                        : <Button variant="outlined" onClick={onCancel} fullWidth>Close</Button>}
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
}

export default DrawerPanel;
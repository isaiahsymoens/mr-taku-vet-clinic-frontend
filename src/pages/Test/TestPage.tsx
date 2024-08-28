import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(open);
    };

  const list = () => (
    <Box sx={{ width: 350 }}
      role="presentation"
    >
      <form  style={{ display: "flex", flexDirection: "column", margin: "auto", gap: "10px", marginTop: "10px", padding: "10px" }}>
          <Typography variant="subtitle1">Add User</Typography>
          <TextField label="First Name" variant="outlined" size="small" fullWidth />
          <TextField label="Middle Name" variant="outlined" size="small" fullWidth />
          <TextField label="Last Name" variant="outlined" size="small" fullWidth />
          <TextField label="Email" variant="outlined" size="small" fullWidth />

          <TextField label="Username" variant="outlined" size="small" fullWidth />
          <TextField label="Password" variant="outlined" size="small" fullWidth />
          <TextField label="Confirm Password" variant="outlined" size="small" fullWidth />

          <Button variant="contained">Cancel</Button>
          <Button variant="contained">Save</Button>
      </form>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
          <Button onClick={toggleDrawer(true)}>Right</Button>
          <Drawer
            anchor="right"
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

import React from "react";
import {Divider, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField} from "@mui/material";
import {DrawerPanelActions} from "../../components/DrawerPanel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {AddEditUserRequest} from "../../api/users";

type UserFormProps = {
    type: DrawerPanelActions | string;
    userData: AddEditUserRequest;
    handleFormChange: (key: keyof AddEditUserRequest, value: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({type, userData, handleFormChange}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <TextField 
                label="First Name" 
                type="text"
                name="firstName"
                variant="outlined" 
                value={userData.firstName}
                onChange={(e) => handleFormChange("firstName", e.target.value)} 
                size="small" 
                fullWidth 
                required
            />
            <TextField 
                label="Middle Name" 
                type="text"
                name="middleName"
                variant="outlined" 
                value={userData.middleName}
                onChange={(e) => handleFormChange("middleName", e.target.value)}  
                size="small" 
                fullWidth 
            />
            <TextField 
                label="Last Name" 
                type="text"
                name="lastName"
                variant="outlined" 
                value={userData.lastName} 
                onChange={(e) => handleFormChange("lastName", e.target.value)} 
                size="small" 
                fullWidth 
                required
            />
            <TextField 
                label="Email" 
                type="email"
                name="email"
                variant="outlined" 
                value={userData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}  
                size="small" 
                fullWidth 
                required
            />
            <FormControlLabel
                label="Active"
                control={<Switch name="active" checked={userData.active} onChange={(e) => handleFormChange("active", e.target.checked)} />}
            />
            <Divider />
            <TextField 
                label="Username"
                type="text" 
                name="username"
                variant="outlined" 
                value={userData.email?.split("@")[0]}   
                size="small" 
                disabled
                fullWidth 
                required
            />
            <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userData.password} 
                    onChange={(e) => handleFormChange("password", e.target.value)}  
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    required={type !== DrawerPanelActions.Edit}
                />
            </FormControl>
        </React.Fragment>
    );
}

export default UserForm;
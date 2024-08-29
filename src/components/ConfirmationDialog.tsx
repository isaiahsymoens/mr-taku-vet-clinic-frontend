import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";

type ConfirmationDialogProps = {
    isOpen: boolean;
    title?: string;
    description?: string;
    onSave: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({isOpen, title, description, onSave, onCancel}) => {
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={onCancel}
            >
                <DialogTitle sx={{fontSize: "1rem", fontWeight: 700}}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: ".85rem"}}>
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} variant="outlined">Cancel</Button>
                    <Button onClick={onSave} 
                        sx={{
                            background: "#DF2920", 
                            color: "#FFF",
                            "&:hover": {background: "#DF2920"}
                        }}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ConfirmationDialog;
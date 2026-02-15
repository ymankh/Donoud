import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type TextInputDialogProps = {
  open: boolean;
  title: string;
  label: string;
  value: string;
  confirmLabel?: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

const TextInputDialog = ({
  open,
  title,
  label,
  value,
  confirmLabel = "Save",
  onChange,
  onClose,
  onConfirm,
}: TextInputDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextInputDialog;

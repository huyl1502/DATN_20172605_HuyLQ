import { TextField } from "@mui/material";

export default function MyTextBox(props: any) {
    return (
        <TextField variant="outlined" fullWidth size="small"
            multiline={props.multiline}
            rows={props.rows}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            onChange={props.onChange}
            value={props.value}
            type={props.type}
        />
    );
}
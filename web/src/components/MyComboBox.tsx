import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function MyComboBox(props: any) {
    return (
        <FormControl required={props.required} fullWidth>
            <InputLabel size="small">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                size="small"
                id="demo-simple-select"
                value={props.value}
                label="Trạng thái"
                onChange={props.onChange}
            >
                {
                    props.dataSource.map((index: number, item: any) => (
                        <MenuItem key={index} value={item[props.keyField]}>{item[props.valueField]}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}
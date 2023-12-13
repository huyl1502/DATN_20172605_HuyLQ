import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function MyComboBox(props: any) {
    return (
        <FormControl required={props.required} fullWidth>
            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label="Trạng thái"
                onChange={props.handleChange}
            >
                {
                    props.dataSource.map((item: any) => (
                        <MenuItem value={item[props.keyField]}>{item[props.valueField]}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}
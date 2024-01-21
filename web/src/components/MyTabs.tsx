import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export default function MyTabs(props: any) {
    const [value, setValue] = React.useState('1');

    const onChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={onChange}
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="one"
                    label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
                    wrapped
                />
                <Tab value="two" label="Item Two" />
                <Tab value="three" label="Item Three" />
            </Tabs>
        </Box>
    );
}
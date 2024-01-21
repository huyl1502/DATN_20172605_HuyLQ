import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function MyLinearChart(props: any) {
    return (
        <Box sx={{ width: props.width }} onKeyDown={() => { }}
        >
            <LineChart
                xAxis={[{
                    data: props.XData, label: props.XLabel, valueFormatter: props.valueFormatter
                }]}
                yAxis={[
                    { id: props.YKey, scaleType: 'linear' },
                ]}
                series={[
                    { yAxisKey: props.YKey, data: props.YData, label: props.YLabel, color: props.color },
                ]}
                leftAxis={props.YKey}
                height={350}
            />
        </Box>
    );
}

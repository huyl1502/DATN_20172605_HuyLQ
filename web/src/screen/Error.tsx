import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                Oops... Something went wrong!
            </Typography>
        </Box>
    );
}
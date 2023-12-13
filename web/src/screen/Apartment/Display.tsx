import { Box, Grid, Stack, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Apartment from "../../models/Apartment";
import { useSearchParams } from "react-router-dom";
import ApartmentDTO from "../../DTO/ApartmentDTO";

export default function ApartmentDisplay() {
    const [apartment, setApartment] = useState(new Apartment());
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");

    const getItem = async () => {
        let req = new ApartmentDTO();
        req.Code = code!;
        let res = await HttpUtils.post<ApartmentDTO>(ApiUrl.ApartmentGetItemByCodeUrl, req);
        setApartment(res.Apartment!);
    }

    useEffect(() => {
        getItem();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ padding: 0 }}>
                    <Stack ml={2} spacing={2} direction="row" justifyContent={"space-between"}>
                        <Typography variant="h5">Chi tiết căn hộ</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <TextField disabled id="outlined-basic" variant="outlined" fullWidth value={apartment.Code} />
                </Grid>
                <Grid item xs={4}>
                    <TextField disabled id="outlined-basic" variant="outlined" fullWidth value={apartment.Name} />
                </Grid>
            </Grid>
        </Box >
    );
}
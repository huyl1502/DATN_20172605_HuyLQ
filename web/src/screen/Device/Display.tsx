import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Device from "../../models/Device";
import { useSearchParams } from "react-router-dom";
import DeviceDTO from "../../DTO/DeviceDTO";
import MyTextBox from "../../components/MyTextBox";
import { LoadingModalContext, MsgContext } from "../../App";

export default function DeviceDisplay() {
    const alert = useContext(MsgContext);
    const loadingModal = useContext(LoadingModalContext);

    const [device, setDevice] = useState(new Device());
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        getItem();
    }, []);

    async function getItem() {
        loadingModal.showLoading();
        try {
            let request = new DeviceDTO();
            request.Code = code!;
            const res = await HttpUtils.post<DeviceDTO>(ApiUrl.DeviceGetItemByCodeUrl, request);
            setDevice(res.Item!);
        }
        catch (ex: any) {
            alert.showAlert("error", ex.message);
        }
        loadingModal.hideLoading();
    }

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
                        <Typography className="header-title" variant="h5">Chi tiết thiết bị</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}>
                            <Link href='/Device/list' style={{ textDecoration: "none", color: "white" }} > Thoát </Link>
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <MyTextBox
                        disabled
                        value={device.Code}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyTextBox
                        disabled
                        value={device.StatusName}
                    />
                </Grid>
                <Grid item xs={8}>
                    <MyTextBox
                        disabled
                        multiline
                        rows={2}
                        value={device.Description}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
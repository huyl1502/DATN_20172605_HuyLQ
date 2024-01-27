import { Box, Grid, Stack, Button, Typography, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import IKeyPairValue from "../../models/IKeyPairValue";
import MyComboBox from "../../components/MyComboBox";
import { LoadingModalContext, MsgContext } from "../../App";
import MyTextBox from "../../components/MyTextBox";
import Device from "../../models/Device";
import DeviceDTO from "../../DTO/DeviceDTO";

export default function DeviceAddNew() {
    const alert = useContext(MsgContext);
    const loadingModal = useContext(LoadingModalContext);

    const [device, setDevice] = useState(new Device());
    const [lstStatus, setLstStatus] = useState(new Array<IKeyPairValue<number, string>>());

    useEffect(() => {
        setupAddNew();
    }, []);

    const setupAddNew = async () => {
        loadingModal.showLoading();
        try {
            const res = await HttpUtils.get<DeviceDTO>(ApiUrl.DeviceSetupAddNewUrl);
            setLstStatus(res.ListStatus!);
        }
        catch (ex: any) {
            alert.showAlert("error", ex.message);
        }
        loadingModal.hideLoading();
    }

    const saveItem = async () => {
        loadingModal.showLoading();
        try {
            let request = new DeviceDTO();
            request.Item = device;
            let res = await HttpUtils.post<object>(ApiUrl.DeviceAddNewUrl, request);
            alert.showAlert("success", "Lưu bản ghi thành công!");
        }
        catch (ex: any) {
            alert.showAlert("error", ex.message);
        }
        loadingModal.hideLoading();
    };

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
                        <Typography className="header-title" variant="h5">Thêm mới thiết bị</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {
                                saveItem();
                            }}
                        >Lưu</Button>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}>
                            <Link href='/device/list' style={{ textDecoration: "none", color: "white" }} > Thoát </Link>
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <MyTextBox
                        label="Mã thiết bị"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = device;
                            item.Code = event.target.value;
                            setDevice(item);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyComboBox
                        label="Trạng thái"
                        required
                        dataSource={lstStatus}
                        keyField="key" valueField="value"
                        value={device.Status}
                        onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                            let item = device;
                            item.Status = parseInt(v.target.value);
                            setDevice(item);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyTextBox
                        label="Mã căn hộ"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = device;
                            item.ApartmentCode = event.target.value;
                            setDevice(item);
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <MyTextBox
                        label="Mô tả"
                        multiline
                        rows={2}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = device;
                            item.Description = event.target.value;
                            setDevice(item);
                        }}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
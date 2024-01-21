import { Box, Grid, Stack, Button, Typography, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Apartment from "../../models/Apartment";
import IKeyPairValue from "../../models/IKeyPairValue";
import MyComboBox from "../../components/MyComboBox";
import ApartmentDTO from "../../DTO/ApartmentDTO";
import { LoadingModalContext, MsgContext } from "../../App";
import MyTextBox from "../../components/MyTextBox";

export default function ApartmentAddNew() {
    const alert = useContext(MsgContext);
    const loadingModal = useContext(LoadingModalContext);

    const [apartment, setApartment] = useState(new Apartment());
    const [lstStatus, setLstStatus] = useState(new Array<IKeyPairValue<number, string>>());

    useEffect(() => {
        setupAddNew();
    }, []);

    const setupAddNew = async () => {
        loadingModal.showLoading();
        try {
            const res = await HttpUtils.get<ApartmentDTO>(ApiUrl.ApartmentSetupAddNewUrl);
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
            let request = new ApartmentDTO();
            request.Item = apartment;
            let res = await HttpUtils.post<object>(ApiUrl.ApartmentAddNewUrl, request);
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
                        <Typography className="header-title" variant="h5">Thêm mới căn hộ</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {
                                saveItem();
                            }}
                        >Lưu</Button>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}>
                            <Link href='/apartment/list' style={{ textDecoration: "none", color: "white" }} > Thoát </Link>
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <MyTextBox
                        label="Mã căn hộ"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Code = event.target.value;
                            setApartment(item);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyTextBox
                        label="Tên căn hộ"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Name = event.target.value;
                            setApartment(item);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyComboBox
                        label="Trạng thái"
                        required
                        dataSource={lstStatus}
                        keyField="key" valueField="value"
                        value={apartment.Status}
                        onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Status = parseInt(v.target.value);
                            setApartment(item);
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <MyTextBox
                        label="Mô tả"
                        multiline
                        rows={2}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Description = event.target.value;
                            setApartment(item);
                        }}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
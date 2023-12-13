import { Box, Grid, Stack, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Apartment from "../../models/Apartment";
import SaveIcon from '@mui/icons-material/Save';
import IKeyPairValue from "../../models/IKeyPairValue";
import MyComboBox from "../../components/MyComboBox";
import ApartmentDTO from "../../DTO/ApartmentDTO";

export default function ApartmentAddNew() {
    const [apartment, setApartment] = useState(new Apartment());
    const [lstStatus, setLstStatus] = useState(new Array<IKeyPairValue<number, string>>());

    useEffect(() => {
        setupAddNew();
    }, []);

    const setupAddNew = async () => {
        const res = await HttpUtils.get<ApartmentDTO>(ApiUrl.ApartmentSetupAddNewUrl);
        setLstStatus(res.ListStatus!);
    }

    const saveItem = () => {
        let request = apartment;
        let res = HttpUtils.post<Apartment>(ApiUrl.ApartmentAddNewUrl, request);
        console.log(res);
    };

    const handleChange = () => {

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
                        <Typography style={{ fontWeight: "bold" }} variant="h5">Thêm mới căn hộ</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {
                                saveItem();
                            }}
                        ><SaveIcon fontSize="small" />Lưu</Button>
                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Mã căn hộ" variant="outlined" fullWidth required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Code = event.target.value;
                            setApartment(item);
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Tên căn hộ" variant="outlined" fullWidth required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = apartment;
                            item.Name = event.target.value;
                            setApartment(item);
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MyComboBox
                        required
                        dataSource={lstStatus}
                        keyField="key" valueField="value"
                        value={apartment.Status}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Mô tả" variant="outlined" fullWidth multiline rows={3}
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
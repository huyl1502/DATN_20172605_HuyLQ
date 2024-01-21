import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Apartment from "../../models/Apartment";
import { useSearchParams } from "react-router-dom";
import ApartmentDTO from "../../DTO/ApartmentDTO";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyTextBox from "../../components/MyTextBox";
import { LoadingModalContext, MsgContext } from "../../App";
import { ChartColor, IndexCode, IndexType } from "../../constant/Constant";
import MyLinearChart from "../../components/LinearChart";
import dayjs from "dayjs";
import Utility from "../../Utils/Utility";
import RealTimeIndex from "../../models/RealTimeIndex";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { EnvConfig } from "../../Utils/EnvConfig";

const hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19];

export default function ApartmentDisplay() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const alert = useContext(MsgContext);
    const loadingModal = useContext(LoadingModalContext);

    const [connected, setConnected] = useState(false);

    const [apartment, setApartment] = useState(new Apartment());
    const [lstTempBucketHis, setLstTempBucketHis] = useState(new Array<number>());
    const [lstHumidityBucketHis, setLstHumidityBucketHis] = useState(new Array<number>());
    const [lstGasBucketHis, setLstGasBucketHis] = useState(new Array<number>());
    const [lstRealTimeTemp, setLstRealTimeTemp] = useState(new Array<number>());
    const [lstRealTimeHumidity, setLstRealTimeHumidity] = useState(new Array<number>());
    const [lstRealTimeGas, setLstRealTimeGas] = useState(new Array<number>());
    const [lstTimeTemp, setLstTimeTemp] = useState(new Array<string>());
    const [lstTimeHumidity, setLstTimeHumidity] = useState(new Array<string>());
    const [lstTimeGas, setLstTimeGas] = useState(new Array<string>());
    const [date, setDate] = useState(yesterday);
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        getItem();
        connectHub();
    }, []);

    useEffect(() => {
        getItem();
    }, [date]);

    function getListRealTimeIndex(ListRealTimeIndex: Array<RealTimeIndex>) {
        let lstTimeTemp = new Array<string>();
        let lstTimeHumidity = new Array<string>();
        let lstTimeGas = new Array<string>();
        let lstIndexTemp = new Array<number>();
        let lstIndexHumidity = new Array<number>();
        let lstIndexGas = new Array<number>();
        ListRealTimeIndex.forEach(index => {
            switch (index.Type) {
                case IndexType.Temp:
                    lstTimeTemp.push(Utility.getTimeString(index.Time));
                    lstIndexTemp.push(index.Value!);
                    break;
                case IndexType.Humidity:
                    lstTimeHumidity.push(Utility.getTimeString(index.Time));
                    lstIndexHumidity.push(index.Value!);
                    break;
                case IndexType.Gas:
                    lstTimeGas.push(Utility.getTimeString(index.Time));
                    lstIndexGas.push(index.Value!);
                    break;
            };
        });

        setLstTimeTemp(lstTimeTemp);
        setLstTimeHumidity(lstTimeHumidity);
        setLstTimeGas(lstTimeGas);
        setLstRealTimeTemp(lstIndexTemp);
        setLstRealTimeHumidity(lstIndexHumidity);
        setLstRealTimeGas(lstIndexGas);
    };

    async function connectHub() {
        if (connected == false) {
            const connection = new HubConnectionBuilder()
                .withUrl(EnvConfig.host + "/IndexHub")
                .withAutomaticReconnect()
                .build();
            await connection
                .start()
                .then(() => {
                    connection.on("GetLastIndex_ByApartmentCode_Response", (message: Array<RealTimeIndex>) => {
                        getListRealTimeIndex(message);
                    });
                })
                .catch((error) => console.log(error));

            if (connection) {
                setConnected(true);
                connection.send("GetLastIndex_ByApartmentCode", code!);
            }
        }
    };

    async function getItem() {
        loadingModal.showLoading();
        try {
            let request = new ApartmentDTO();
            request.Code = code!;
            request.Date = date;
            const res = await HttpUtils.post<ApartmentDTO>(ApiUrl.ApartmentGetItemByCodeUrl, request);
            setApartment(res.Item!);

            let lstTemp = new Array<number>();
            let lstHumidity = new Array<number>();
            let lstGas = new Array<number>();
            res.Item!.ListIndexBucketHis!.forEach(index => {
                switch (index.Type) {
                    case IndexType.Temp:
                        index.Measurements?.forEach(measurement => lstTemp.push(measurement));
                        break;
                    case IndexType.Humidity:
                        index.Measurements?.forEach(measurement => lstHumidity.push(measurement));
                        break;
                    case IndexType.Gas:
                        index.Measurements?.forEach(measurement => lstGas.push(measurement));
                        break;
                }
            });
            setLstTempBucketHis(lstTemp);
            setLstHumidityBucketHis(lstHumidity);
            setLstGasBucketHis(lstGas);

            getListRealTimeIndex(res.Item!.ListRealTimeIndex!);
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
                        <Typography className="header-title" variant="h5">Chi tiết căn hộ</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}>
                            <Link href='/apartment/list' style={{ textDecoration: "none", color: "white" }} > Thoát </Link>
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <MyTextBox
                        disabled
                        value={apartment.Code}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyTextBox
                        disabled
                        value={apartment.Name}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyTextBox
                        disabled
                        value={apartment.StatusName}
                    />
                </Grid>
                <Grid item xs={8}>
                    <MyTextBox
                        disabled
                        multiline
                        rows={2}
                        value={apartment.Description}
                    />
                </Grid>

                <Grid item xs={12} style={{ paddingLeft: 0 }}>
                    <Stack ml={2} spacing={2} direction="row" justifyContent={"space-between"}>
                        <Typography className="header-title" variant="h5">Chỉ số ngày hôm nay</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian"
                        XData={time}
                        YKey={"temp"}
                        YData={lstRealTimeTemp}
                        YLabel="Nhiệt độ (độ C)"
                        valueFormatter={(value: any) => {
                            return lstTimeTemp[value];
                        }}
                        color={ChartColor.Temp}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian"
                        XData={time}
                        YKey={"humidity"}
                        YData={lstRealTimeHumidity}
                        YLabel="Độ ẩm (%)"
                        valueFormatter={(value: any) => {
                            return lstTimeHumidity[value];
                        }}
                        color={ChartColor.Humidity}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian"
                        XData={time}
                        YKey={"gas"}
                        YData={lstRealTimeGas}
                        YLabel="Khí gas (cf)"
                        valueFormatter={(value: any) => {
                            return lstTimeGas[value];
                        }}
                        color={ChartColor.Gas}
                    />
                </Grid>

                <Grid item xs={12} style={{ paddingLeft: 0 }}>
                    <Stack ml={2} spacing={2} direction="row" justifyContent={"space-between"}>
                        <Typography className="header-title" variant="h5">Chỉ số trung bình theo ngày</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Ngày *" className="datepicker" defaultValue={dayjs().subtract(1, 'day')}
                            onAccept={(event: any) => {
                                setDate(event);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8}></Grid>

                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian (giờ)"
                        XData={hour}
                        YKey={"temp"}
                        YData={lstTempBucketHis}
                        YLabel="Nhiệt độ (độ C)"
                        valueFormatter={(value: any) => {
                            return value + 1 + "";
                        }}
                        color={ChartColor.Temp}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian (giờ)"
                        XData={hour}
                        YKey={"humidity"}
                        YData={lstHumidityBucketHis}
                        YLabel="Độ ẩm (%)"
                        valueFormatter={(value: any) => {
                            return value + 1 + "";
                        }}
                        color={ChartColor.Humidity}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MyLinearChart
                        width="100%"
                        XLabel="Thời gian (giờ)"
                        XData={hour}
                        YKey={"gas"}
                        YData={lstGasBucketHis}
                        YLabel="Khí gas (cf)"
                        valueFormatter={(value: any) => {
                            return value + 1 + "";
                        }}
                        color={ChartColor.Gas}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
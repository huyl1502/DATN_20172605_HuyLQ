import { Box, Grid, Stack, Typography, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Link } from "@mui/material";
import { useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Device from "../../models/Device";
import ReplayIcon from '@mui/icons-material/Replay';
import DeviceDTO from "../../DTO/DeviceDTO";

export default function DeviceDefault() {
    const [lstDevice, setLstDevice] = useState(new Array<Device>());

    async function loadData() {
        const res = await HttpUtils.get<DeviceDTO>(ApiUrl.DeviceGetAllUrl);
        setLstDevice(res.ListItems!);
    }

    useEffect(() => {
        loadData();
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
                        <Typography className="header-title" variant="h5">Danh sách thiết bị</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}>
                            <Link href='./addnew' style={{ textDecoration: "none", color: "white" }} > Thêm mới </Link>
                        </Button>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#c02135" }}>
                                <TableRow>
                                    <TableCell style={{ color: "white", fontWeight: "bold", width: "40px" }}>STT</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Mã thiết bị</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Mã căn hộ</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Mô tả</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ backgroundColor: "#f2f2f2" }}>
                                {lstDevice.map((item, index) => (
                                    <TableRow
                                        key={item.Code}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="left">
                                            <Link href={`display?code=${item.Code}`} variant="body2">
                                                {item.Code}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{item.ApartmentCode}</TableCell>
                                        <TableCell align="left">{item.Description}</TableCell>
                                        <TableCell align="center">{item.StatusName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} style={{ padding: 0 }}>
                    <Stack ml={2} mt={2} spacing={2} direction="row" justifyContent={"center"}>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {

                            }}
                        ><ReplayIcon fontSize="small" />Tải thêm</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box >
    );
}
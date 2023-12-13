import { Box, Grid, Stack, Typography, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Link } from "@mui/material";
import { useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Apartment from "../../models/Apartment";
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import ApartmentDTO from "../../DTO/ApartmentDTO";

export default function ApartmentDefault() {
    const [lstApartment, setLstApartment] = useState(new Array<Apartment>());

    const loadData = async () => {
        const res = await HttpUtils.get<ApartmentDTO>(ApiUrl.ApartmentGetAllUrl);
        setLstApartment(res.ListApartment!);
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
                        <Typography variant="h5">Danh sách căn hộ</Typography>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {

                            }}
                        ><AddIcon fontSize="small" />Thêm mới</Button>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#c02135" }}>
                                <TableRow>
                                    <TableCell style={{ color: "white", fontWeight: "bold", width: "40px" }}>STT</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Mã căn hộ</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Tên căn hộ</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Mô tả</TableCell>
                                    <TableCell style={{ color: "white", fontWeight: "bold" }} align="center">Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ backgroundColor: "#f2f2f2" }}>
                                {lstApartment.map((item, index) => (
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
                                        <TableCell align="left">{item.Name}</TableCell>
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
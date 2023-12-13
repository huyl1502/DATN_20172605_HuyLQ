import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import Person from "../../models/Person";

export default function PersonAddNew() {
    const [person, setPerson] = useState(new Person());

    useEffect(() => {
        let res = HttpUtils.get<Person>(ApiUrl.PersonGetAllUrl);
        console.log(res);
    }, []);

    const saveItem = () => {
        let request = person;
        let res = HttpUtils.post<Person>(ApiUrl.PersonAddNewUrl, request);
        console.log(res);
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
                    <Stack spacing={2} direction="row" justifyContent={"right"}>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {
                                saveItem();
                            }}
                        >Lưu</Button>
                    </Stack>
                </Grid>

                <Grid item xs={2}>
                    <TextField id="outlined-basic" label="Mã" variant="outlined" fullWidth
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = person;
                            item.Code = event.target.value;
                            setPerson(item);
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField id="outlined-basic" label="Tên" variant="outlined" fullWidth
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = person;
                            item.Name = event.target.value;
                            setPerson(item);
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = person;
                            item.Phone = event.target.value;
                            setPerson(item);
                        }}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}
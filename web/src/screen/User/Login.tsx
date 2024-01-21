import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MyTextBox from "../../components/MyTextBox";
import Account from "../../models/Account";
import UserDTO from "../../DTO/UserDTO";
import { LoadingModalContext, MsgContext } from "../../App";
import HttpUtils from "../../Utils/HttpUtils";
import ApiUrl from "../../constant/ApiUrl";
import useLocalStorage from "../../Utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Login(props: any) {
    const alert = useContext(MsgContext);
    const loadingModal = useContext(LoadingModalContext);
    const navigate = useNavigate();

    const [account, setAccount] = useState(new Account());
    const [accountInfo, setAccountInfo] = useLocalStorage("account", new Account());

    useEffect(() => {
        // if (Object.keys(accountInfo).length || accountInfo == null || accountInfo == undefined)
        //     navigate("../dashboard");
    });

    const login = async () => {
        loadingModal.showLoading();
        try {
            let request = new UserDTO();
            request.Account = account;
            let res = await HttpUtils.post<UserDTO>(ApiUrl.LoginUrl, request);
            if (res.Account?.AccessToken) {
                setAccountInfo(res.Account);
                navigate("../dashboard");
            }
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
            <Grid container spacing={2} width={"35%"}>
                <Grid item xs={12} style={{ padding: "15px 0" }}>
                    <Stack ml={2} spacing={2} direction="row" justifyContent={"space-between"}>
                        <Typography className="header-title" variant="h5">Đăng nhập</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <MyTextBox
                        label="Tài khoản"
                        required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = account;
                            item.UserName = event.target.value;
                            setAccount(item);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyTextBox
                        label="Mật khẩu"
                        required
                        type="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            let item = account;
                            item.PassWord = event.target.value;
                            setAccount(item);
                        }}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: "15px 0" }}>
                    <Stack ml={2} spacing={2} direction="row" justifyContent={"space-between"}>
                        <Button variant="contained" style={{ backgroundColor: "#c02135" }}
                            onClick={() => {
                                login();
                            }}
                        >Đăng nhập</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
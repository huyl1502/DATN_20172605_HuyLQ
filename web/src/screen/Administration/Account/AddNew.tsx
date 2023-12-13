import { Box } from "@mui/material";
import { useEffect } from "react";
import HttpUtils from "../../../Utils/HttpUtils";
import ApiUrl from "../../../constant/ApiUrl";
import Account from "../../../models/Account";

export default function AccountAddNew() {
    useEffect(() => {
        let res = HttpUtils.get<Account>(ApiUrl.AccountGetAllUrl);
        console.log(res);
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

        </Box>
    );
}
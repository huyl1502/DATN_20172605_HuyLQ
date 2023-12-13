import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import * as signalR from "@aspnet/signalr";

export default function Dashboard() {
    // const [message, setMessage] = useState("initial value");
    // const [conn, setConn] = useState(new signalR.HubConnectionBuilder().withUrl("https://localhost:44390/IndexHub").build());

    // useEffect(() => {
    //     conn.start().then(() => {
    //         conn.send("SendMessage", "1");
    //     });
    //     conn.on("ReceiveMessage", receiveMsg => {
    //         setMessage(receiveMsg);
    //     });
    // });

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
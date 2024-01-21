import { Alert, Snackbar } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

type MyMessageBoxRef = {
    show: () => void;
}

type MyMessageBoxProps = {
    type: any,
    msg: string,
};

const MyMessageBox = forwardRef<MyMessageBoxRef, MyMessageBoxProps>((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setOpen(true);
        }
    }));

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={() => { setOpen(false); }}>
            <Alert variant="filled" severity={props.type == "" ? 'info' : props.type}>
                {props.msg}
            </Alert>
        </Snackbar>
    );
})

export { MyMessageBox };
export type { MyMessageBoxRef };

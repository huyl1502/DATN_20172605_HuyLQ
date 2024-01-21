import { Backdrop, CircularProgress } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

type LoadingModalRef = {
    show: () => void;
    hide: () => void;
}

type LoadingModalProps = {
};

const LoadingModal = forwardRef<LoadingModalRef, LoadingModalProps>((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setOpen(true);
        },
        hide() {
            setOpen(false);
        }
    }));

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
})

export { LoadingModal };
export type { LoadingModalRef };

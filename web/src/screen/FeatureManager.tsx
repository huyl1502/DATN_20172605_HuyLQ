import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SensorsIcon from '@mui/icons-material/Sensors';

export default class FeatureManager {
    static FeatureCollection = [
        {
            url: "/dashboard",
            label: "Dashboard",
            icon: <DashboardIcon />,
        },
        {
            url: "/apartment/list",
            label: "Danh sách căn hộ",
            icon: <ApartmentIcon />,
        },
        {
            url: "/device/list",
            label: "Danh sách thiết bị",
            icon: <SensorsIcon />,
        }
    ]
}
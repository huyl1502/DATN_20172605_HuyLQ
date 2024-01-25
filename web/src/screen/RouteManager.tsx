import AccountAddNew from "./Administration/Account/AddNew";
import ApartmentAddNew from "./Apartment/AddNew";
import ApartmentDefault from "./Apartment/Default";
import ApartmentDisplay from "./Apartment/Display";
import Dashboard from "./Dashboard";
import DeviceAddNew from "./Device/AddNew";
import DeviceDefault from "./Device/Default";
import DeviceDisplay from "./Device/Display";
import Error from "./Error";
import PersonAddNew from "./Person/AddNew";
import Login from "./User/Login";

export default class RouteManager {
    static RouteCollection = [
        { url: "/dashboard", element: <Dashboard />, },
        { url: "/error", element: <Error />, },
        { url: "/account/addnew", element: <AccountAddNew />, },
        { url: "/person/addnew", element: <PersonAddNew />, },
        { url: "/apartment/addnew", element: <ApartmentAddNew />, },
        { url: "/apartment/list", element: <ApartmentDefault />, },
        { url: "/apartment/display", element: <ApartmentDisplay />, },
        { url: "/device/addnew", element: <DeviceAddNew />, },
        { url: "/device/list", element: <DeviceDefault />, },
        { url: "/device/display", element: <DeviceDisplay />, },
        { url: "/login", element: <Login />, },
    ]
}
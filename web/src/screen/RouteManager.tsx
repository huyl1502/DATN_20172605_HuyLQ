import AccountAddNew from "./Administration/Account/AddNew";
import ApartmentAddNew from "./Apartment/AddNew";
import ApartmentDefault from "./Apartment/Default";
import ApartmentDisplay from "./Apartment/Display";
import Dashboard from "./Dashboard";
import Error from "./Error";
import PersonAddNew from "./Person/AddNew";

export default class RouteManager {
    static RouteCollection = [
        { url: "/dashboard", element: <Dashboard />, },
        { url: "/error", element: <Error />, },
        { url: "/account/addnew", element: <AccountAddNew />, },
        { url: "/person/addnew", element: <PersonAddNew />, },
        { url: "/apartment/addnew", element: <ApartmentAddNew />, },
        { url: "/apartment/default", element: <ApartmentDefault />, },
        { url: "/apartment/display", element: <ApartmentDisplay />, },
    ]
}
import { HttpMethod } from "../constant/Constant";
import { EnvConfig } from "./EnvConfig";

export default class HttpUtils {
    static async get<T>(apiUrl: string) {
        let url = EnvConfig.host + apiUrl;

        let header = {};
        var acc = JSON.parse(localStorage.getItem("account")!);
        if (acc == null || acc == undefined) {
            header = {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
            }
        }
        else {
            header = {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
                "Authorization": "Bearer " + acc["AccessToken"],
            }
        }

        const response = await fetch(url, {
            method: HttpMethod.GET,
            headers: header,
        }).then(response => {
            if (response.status == 401) {
                //window.location.href = window.location.origin + "/login";
            }
            if (response.ok == false)
                throw new Error("Error!");
            else return response.json();
        })
            .then(data => { return data })
            .catch(error => {
                throw new Error(error.message);
            });

        return response as T;
    }

    static async post<T>(apiUrl: string, requestData: object) {
        let url = EnvConfig.host + apiUrl;

        let header = {};
        var acc = JSON.parse(localStorage.getItem("account")!);
        if (acc == null || acc == undefined) {
            header = {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
            }
        }
        else {
            header = {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
                "Authorization": "Bearer " + acc["AccessToken"],
            }
        }

        const response = await fetch(url, {
            method: HttpMethod.POST,
            headers: header,
            body: JSON.stringify(requestData),
        }).then(response => {
            if (response.status == 401) {
                //window.location.href = window.location.origin + "/login";
            }
            if (response.ok == false)
                throw new Error("Error!");
            else {
                return response.json();
            };
        })
            .then(data => { return data })
            .catch(error => {
                throw new Error(error.message);
            });

        return response as T;
    }
}
// const useFetch = async <T>(method: string, apiUrl: string, requestData = undefined) => {
//     const [response, setResponse] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         let request = {};
//         if (method == HttpMethod.GET) {
//             request = {
//                 method: HttpMethod.GET,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-RapidAPI-Key": "your-api-key",
//                     "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
//                 },
//             };
//         }
//         else if (method == HttpMethod.POST) {
//             request = {
//                 method: HttpMethod.POST,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-RapidAPI-Key": "your-api-key",
//                     "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
//                 },
//                 body: JSON.stringify(requestData),
//             };
//         }

//         fetch(apiUrl, request).then(response => {
//             if (response.status == 401) {
//                 navigate(EnvConfig.host + "/login");
//             }
//             if (response.ok == false)
//                 throw new Error("Error!");
//             else return response.json();
//         })
//             .then(data => { return data })
//             .catch(error => {
//                 throw new Error(error.message);
//             });
//     }, [apiUrl]);

//     return [response as T];
// };

// export default useFetch;
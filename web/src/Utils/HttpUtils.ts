import { HttpMethod } from "../constant/Constant";
import { EnvConfig } from "./EnvConfig";

export default class HttpUtils {
    static async get<T>(apiUrl: string) {
        let url = EnvConfig.host + apiUrl;

        const response = await fetch(url, {
            method: HttpMethod.GET,
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
            },
        }).then(response => { return response.json() })
            .then(data => { return data })
            .catch(error => console.error(error));

        return response as T;
    }

    static async post<T>(apiUrl: string, requestData: object) {
        let url = EnvConfig.host + apiUrl;

        const response = await fetch(url, {
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
            },
            body: JSON.stringify(requestData),
        }).then(response => { return response.json() })
            .then(data => { return data })
            .catch(error => console.error(error));

        return response as T;
    }
}
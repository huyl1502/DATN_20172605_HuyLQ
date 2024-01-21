class HttpMethod {
    static GET: string = "GET";
    static POST: string = "POST";
    static PUT: string = "PUT";
    static DELETE: string = "DELETE";
}

class IndexType {
    static Temp: number = 1;
    static Humidity: number = 2;
    static Gas: number = 3;
}

class IndexCode {
    static Temp: string = "temp";
    static Humidity: string = "humidity";
    static Gas: string = "gas";
}

class ChartColor {
    static Temp: string = "#e15759";
    static Humidity: string = "#4e79a7";
    static Gas: string = "#f28e2c";
}

export { HttpMethod, IndexType, IndexCode, ChartColor }
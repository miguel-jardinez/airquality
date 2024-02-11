export interface AQICoord {
  lon: number;
  lat: number;
}

export interface AQIMain {
  aqi: number;
}

export interface AQIList {
  main: AQIMain;
  components: { [key: string]: number };
  dt: number;
}

export interface AQIResponse {
  coord: AQICoord;
  list: AQIList[];
}

export interface Meta {
  name: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface Datetime {
  utc: Date;
  local: Date;
}

export interface Owner {
  id: number;
  name: string;
}

export interface Parameter {
  id: number;
  name: string;
  units: string;
  displayName: null | string;
}

export interface Sensor {
  id: number;
  name: string;
  parameter: Parameter;
}

export interface Result {
  id: number;
  name: string;
  locality: string | null;
  timezone: string;
  country: Country;
  owner: Owner;
  provider: Owner;
  isMobile: boolean;
  isMonitor: boolean;
  instruments: Owner[];
  sensors: Sensor[];
  coordinates: Coordinates;
  bounds: number[];
  distance: null;
  datetimeFirst: Datetime;
  datetimeLast: Datetime;
}

export interface LocationDetails {
  meta: Meta;
  results: Result[];
}

export interface LocationDetailsResponse {
  code: number,
  data: LocationDetails
}

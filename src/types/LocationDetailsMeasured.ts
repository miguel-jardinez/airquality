export interface LocationDetailsMeasuredMeta {
  name: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}

export interface LocationDetailsMeasuredDatetime {
  utc: Date;
  local: Date;
}

export interface LocationDetailsMeasuredPeriod {
  label: string;
  interval: string;
  datetimeFrom: LocationDetailsMeasuredDatetime;
  datetimeTo: LocationDetailsMeasuredDatetime;
}
export interface LocationDetailsMeasuredParameter {
  id: number;
  name: string;
  units: string;
  displayName: null;
}

export interface LocationDetailsMeasuredCoverage {
  expectedCount: number;
  expectedInterval: string;
  observedCount: number;
  observedInterval: string;
  percentComplete: number;
  percentCoverage: number;
  datetimeFrom: LocationDetailsMeasuredDatetime;
  datetimeTo: LocationDetailsMeasuredDatetime;
}

export interface LocationDetailsMeasuredResult {
  period: LocationDetailsMeasuredPeriod;
  value: number;
  parameter: LocationDetailsMeasuredParameter;
  coordinates: null;
  summary: { [key: string]: number | null };
  coverage: LocationDetailsMeasuredCoverage;
}

export interface LocationDetailsMeasured {
  meta: LocationDetailsMeasuredMeta;
  results: LocationDetailsMeasuredResult[];
}

export interface LocationDetailsMeasuredResponse {
  status: number,
  data: LocationDetailsMeasured,
}

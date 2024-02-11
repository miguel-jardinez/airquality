export interface PollutantMeta {
  name: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}

export interface PollutantResult {
  id: number;
  name: string;
  units: string;
  displayName: null | string;
  description: null | string;
}
export interface Pollutant {
  meta: PollutantMeta;
  results: PollutantResult[];
}

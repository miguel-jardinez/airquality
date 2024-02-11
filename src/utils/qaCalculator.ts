export const airQualityValues = {
  co: {
    good: { min: 0, max: 4.4 },
    moderate: { min: 4.5, max: 9.4 },
    badSensitive: { min: 9.5, max: 12.4 },
    bad: { min: 12.5, max: 15.4 },
    veryBad: { min: 15.5, max: 30.4 },
    danger: { min: 30.5, max: Number.MAX_SAFE_INTEGER },
  },
  no2: {
    good: { min: 0, max: 53 },
    moderate: { min: 54, max: 100 },
    badSensitive: { min: 101, max: 360 },
    bad: { min: 361, max: 649 },
    veryBad: { min: 650, max: 1249 },
    danger: { min: 1250, max: Number.MAX_SAFE_INTEGER },
  },
  so2: {
    good: { min: 0, max: 0.009 },
    moderate: { min: 0.01, max: 0.024 },
    badSensitive: { min: 0.025, max: 0.039 },
    bad: { min: 0.04, max: 0.059 },
    veryBad: { min: 0.06, max: 0.079 },
    danger: { min: 0.08, max: Number.MAX_SAFE_INTEGER },
  },
  o3: {
    good: { min: 0, max: 0.009 },
    moderate: { min: 0.01, max: 0.024 },
    badSensitive: { min: 0.025, max: 0.034 },
    bad: { min: 0.035, max: 0.044 },
    veryBad: { min: 0.045, max: 0.054 },
    danger: { min: 0.055, max: Number.MAX_SAFE_INTEGER },
  },
  no: {
    good: { min: 0, max: 0.025 },
    moderate: { min: 0.026, max: 0.049 },
    badSensitive: { min: 0.05, max: 0.099 },
    bad: { min: 0.1, max: 0.124 },
    veryBad: { min: 0.125, max: 0.164 },
    danger: { min: 0.165, max: Number.MAX_SAFE_INTEGER },
  },
  nox: {
    good: { min: 0, max: 0.079 },
    moderate: { min: 0.08, max: 0.099 },
    badSensitive: { min: 0.1, max: 0.199 },
    bad: { min: 0.2, max: 0.249 },
    veryBad: { min: 0.25, max: 0.324 },
    danger: { min: 0.325, max: Number.MAX_SAFE_INTEGER },
  },
  pm10: {
    good: { min: 0, max: 54 },
    moderate: { min: 55, max: 154 },
    badSensitive: { min: 155, max: 254 },
    bad: { min: 255, max: 354 },
    veryBad: { min: 355, max: 424 },
    danger: { min: 425, max: Number.MAX_SAFE_INTEGER },
  },
  pm25: {
    good: { min: 0, max: 12 },
    moderate: { min: 12.1, max: 35.4 },
    badSensitive: { min: 35.5, max: 55.4 },
    bad: { min: 55.5, max: 150.4 },
    veryBad: { min: 150.5, max: 250.4 },
    danger: { min: 250.5, max: Number.MAX_SAFE_INTEGER },
  },
  um050: {
    good: { min: 0, max: 0.009 },
    moderate: { min: 0.01, max: Number.MAX_SAFE_INTEGER },
    badSensitive: { min: 0.011, max: Number.MAX_SAFE_INTEGER },
    bad: { min: 0.012, max: Number.MAX_SAFE_INTEGER },
    veryBad: { min: 0.013, max: Number.MAX_SAFE_INTEGER },
    danger: { min: 0.014, max: Number.MAX_SAFE_INTEGER },
  },
};

export const airQualityLabels = {
  good: {
    label: 'Good',
    color: 'green.500',
  },
  moderate: {
    label: 'Moderate',
    color: 'yellow.300',
  },
  badSensitive: {
    label: 'Unhealthy for Sensitive Groups',
    color: 'yellow.500',
  },
  bad: {
    label: 'Unhealthy',
    color: 'orange.500',
  },
  veryBad: {
    label: 'Very Unhealthy',
    color: 'red.500',
  },
  danger: {
    label: 'Hazardous',
    color: 'red.800',
  },
};

export type QAPollutant = keyof typeof airQualityValues;
export type QAAirQualityLabels = keyof typeof airQualityLabels;

export const airPollutantList: string[] = ['um050', 'no2', 'no', 'o3', 'pm25', 'nox', 'so2', 'pm10', 'co'];

export const getAirQualityLevel = (contaminant: QAPollutant, value: number): string | null => {
  const contaminantData = airQualityValues[contaminant];
  if (!contaminantData) {
    return null;
  }

  let nearestLevel: string | null = null;
  let minDistance = Number.MAX_VALUE;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const level in contaminantData) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const range = contaminantData[level];
    const midPoint = (range.min + range.max) / 2;
    const distance = Math.abs(value - midPoint);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLevel = level;
    }
  }

  return nearestLevel;
};

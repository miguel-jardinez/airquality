export const airQualityIndex = {
  1: {
    label: 'Good',
    color: 'green.500',
  },
  2: {
    label: 'Fair',
    color: 'yellow.300',
  },
  3: {
    label: 'Moderate',
    color: 'yellow.500',
  },
  4: {
    label: 'Poor',
    color: 'red.500',
  },
  5: {
    label: 'Very Poor',
    color: 'red.800',
  },
};

export type QAAirQualityLabels = keyof typeof airQualityIndex;

export const airPollutantList: string[] = ['um050', 'no2', 'no', 'o3', 'pm25', 'nox', 'so2', 'pm10', 'co'];

import { getAirQualityLevel } from '../qaCalculator';

describe('getAirQualityLevel', () => {
  it('Should return the closest level according to the provided value.', () => {
    // Probar el comportamiento de la función getAirQualityLevel con diferentes valores
    expect(getAirQualityLevel('co', 2)).toBe('good');
    expect(getAirQualityLevel('co', 7)).toBe('moderate');
    expect(getAirQualityLevel('co', 11)).toBe('badSensitive');
  });
});

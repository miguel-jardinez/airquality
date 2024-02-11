import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { ResourcesStatus } from '@quality/utils/Resources';
import { useAirQualityDetails } from '../useAirQualityDetails';

// Mock de useLocationProvider
jest.mock('../../../../providers/LocationProvider/useLocationProvider', () => ({
  useLocationProvider: jest.fn().mockReturnValue({ coords: { status: 'SUCCESS', data: { latitude: 1, longitude: 1 } } }),
}));

// Mock de axios
jest.mock('axios');
const sensorId = 'sensor_id';

describe('useAirQualityDetails', () => {
  it('Should successfully fetch location details when an ID not provided', async () => {
    // Arrange
    const locationData = {
      data: {
        data: {
          results: [
            {
              sensors: [
                {
                  parameter: {
                    id: sensorId,
                  },
                },
              ],
            },
          ],
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(locationData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useAirQualityDetails({ id: '' }),
    );
    await waitForNextUpdate();

    // Assertion
    expect(result.current.location.status).toBe(ResourcesStatus.SUCCESS);
    expect(result.current.sensorSelected).toBe(sensorId);
  });

  it('Should successfully fetch location details when an ID is provided.', async () => {
    // Arrange
    const locationData = {
      data: {
        data: {
          results: [
            {
              sensors: [
                {
                  parameter: {
                    id: 'sensor_id',
                  },
                },
              ],
            },
          ],
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(locationData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useAirQualityDetails({ id: 'location_id' }),
    );
    await waitForNextUpdate();

    // Assertion
    expect(result.current.location.status).toBe(ResourcesStatus.SUCCESS);
    expect(result.current.sensorSelected).toBe(sensorId);
  });
});

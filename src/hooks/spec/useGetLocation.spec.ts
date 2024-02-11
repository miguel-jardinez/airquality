import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { ResourcesStatus } from '@quality/utils/Resources';
import { useGetLocation } from '../useGetLocation';

jest.mock('axios');

describe('useGetLocation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch location data by id successfully', async () => {
    // Arrange
    const id: number = 123;
    const responseData = {
      data: {
        data: {
          results: [{
            sensors: [{ parameter: { id: 456 } }],
          }],
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(responseData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetLocation({ id: id.toString() }),
    );

    await waitForNextUpdate();

    // Assertion
    expect(result.current.location.status).toEqual('SUCCESS');
    expect(result.current.sensors.status).toEqual('SUCCESS');
    expect(result.current.sensorSelected).toEqual('456');
  });

  it('should fetch location data by coordinates successfully', async () => {
    // Arrange
    const coords = { latitude: 40.7128, longitude: -74.006 } as GeolocationCoordinates;
    const responseData = {
      data: {
        data: {
          results: [{
            sensors: [{ parameter: { id: 789 } }],
          }],
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(responseData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetLocation({ coords }),
    );

    await waitForNextUpdate();

    // Assertion
    expect(result.current.location.status).toEqual(ResourcesStatus.SUCCESS);
    expect(result.current.sensors.status).toEqual(ResourcesStatus.SUCCESS);
    expect(result.current.sensorSelected).toEqual('789');
  });

  it('should handle error when fetching location data', async () => {
    // Arrange
    const id: number = 123;
    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetLocation({ id: id.toString() }),
    );

    await waitForNextUpdate();

    // Assertion
    // expect(result.current.location.status).toEqual(ResourcesStatus.ERROR);
    expect(result.current.sensors.status).toEqual(ResourcesStatus.ERROR);
    expect(result.current.sensorSelected).toBeNull();
  });
});

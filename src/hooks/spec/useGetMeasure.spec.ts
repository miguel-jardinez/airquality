import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { ResourcesStatus } from '@quality/utils/Resources';
import { LocationDetails } from '@quality/types/LocationDetails';
import { useGetMeasure } from '../useGetMeasure';

jest.mock('axios');

describe('useGetMeasure', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch measure data successfully', async () => {
    // Arrange
    const location = {
      results: [{ id: 123 }],
    } as LocationDetails;
    const sensorSelected: string = 'sensorId';
    const dateSelected: string = '2024-02-11';

    const responseData = {
      data: {
        data: {
          results: [{ value: 50 }],
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(responseData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetMeasure({
        location,
        sensorSelected,
        dateSelected,
      }),
    );

    await waitForNextUpdate();

    // Assertion
    expect(result.current.measure.status).toEqual(ResourcesStatus.SUCCESS);

    if (result.current.measure.status === ResourcesStatus.SUCCESS) {
      expect(result.current.measure.data[0].value).toEqual(50);
    }
  });

  it('should handle error when fetching measure data', async () => {
    // Arrange
    const location = {
      results: [{ id: 123 }],
    } as LocationDetails;

    const sensorSelected: string = 'sensorId';
    const dateSelected: string = '2024-02-11';

    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetMeasure({
        location,
        sensorSelected,
        dateSelected,
      }),
    );

    await waitForNextUpdate();

    // Assertion
    expect(result.current.measure.status).toEqual('ERROR');

    if (result.current.measure.status === ResourcesStatus.ERROR) {
      expect(result.current.measure.message).toEqual(errorMessage);
    }
  });
});

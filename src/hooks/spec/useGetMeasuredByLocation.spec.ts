import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { ResourcesStatus } from '@quality/utils/Resources';
import { useGetMeasuredByLocation } from '../useGetMeasuredByLocation';

jest.mock('axios');

describe('useGetMeasuredByLocation', () => {
  it('Should return a successful response when the API call is successful.', async () => {
    // Arrange
    const apiResponse = {
      data: {
        response: 'Mock_response',
      },
    };
    const locationId = 19284;
    const responseData = {
      data: apiResponse,
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(responseData);

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetMeasuredByLocation({ id: locationId }),
    );
    await waitForNextUpdate();

    // Assertion
    expect(result.current.response.status).toBe(ResourcesStatus.SUCCESS);
    if (result.current.response.status === ResourcesStatus.SUCCESS) {
      expect(result.current.response.data).toBe(apiResponse.data);
    }
  });

  it('Should return an error response when the API call fails.', async () => {
    // Arrange
    const locationId = 19284;
    const errorMessage = 'Error al cargar los datos';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Act
    const { result, waitForNextUpdate } = renderHook(
      () => useGetMeasuredByLocation({ id: locationId }),
    );
    await waitForNextUpdate();

    // Assertion
    expect(result.current.response.status).toBe(ResourcesStatus.ERROR);

    if (result.current.response.status === ResourcesStatus.ERROR) {
      expect(result.current.response.message).toBe(errorMessage);
    }
  });
});

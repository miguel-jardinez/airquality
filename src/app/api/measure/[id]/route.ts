import { NextResponse } from 'next/server';
import { axiosClient } from '@quality/utils/axiosClient';
import { LocationDetailsMeasured } from '@quality/types/LocationDetailsMeasured';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const url = new URL(request.url);

    const response = await axiosClient.get<LocationDetailsMeasured>(`/locations/${id}/measurements${url.search}`);

    return NextResponse.json({
      code: response.status,
      data: response.data,
    });
  } catch (error: any) {
    const errorResponse = {
      status: 'error',
      message: error.message,
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

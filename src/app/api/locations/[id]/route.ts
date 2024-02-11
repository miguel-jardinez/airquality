import { NextResponse } from 'next/server';
import { axiosClient } from '@quality/utils/axiosClient';
import { LocationDetails } from '@quality/types/LocationDetails';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const locationResponse = await axiosClient.get<LocationDetails>(`/locations/${id}`);

    return NextResponse.json({ code: locationResponse.status, data: locationResponse.data });
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

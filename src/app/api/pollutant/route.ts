import { axiosClient } from '@quality/utils/axiosClient';
import { NextResponse } from 'next/server';
import { Pollutant } from '@quality/types/PollulantDetails';

export async function GET() {
  try {
    const response = await axiosClient.get<Pollutant>('/parameters?parameter_type=pollutant');

    return NextResponse.json({ code: response.status, data: response.data });
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

import { NextRequest, NextResponse } from 'next/server';
import { axiosClient } from '@quality/utils/axiosClient';

export async function GET(request: NextRequest) {
  try {
    const coordinates = new URL(request.url).searchParams.get('coords')?.replace(',', '%2C');
    const response = await axiosClient.get(`locations?coordinates=${coordinates}&radius=10000`);

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

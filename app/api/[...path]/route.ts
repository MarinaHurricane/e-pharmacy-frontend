import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { serverApi } from "@/app/lib/api/serverApi";

type Params = {
  path: string[];
};

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { path } = await params;

    const endpoint = `/${path.join("/")}`;

    const cookieStore = await cookies();

    const body =
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.text();

    const response = await serverApi.request({
      method: request.method,
      url: endpoint,

      params: Object.fromEntries(
        request.nextUrl.searchParams
      ),

      data: body || undefined,

      headers: {
        Cookie: cookieStore.toString(),

        ...(request.headers.get("content-type")
          ? {
              "Content-Type":
                request.headers.get("content-type")!,
            }
          : {}),
      },
    });

    return new NextResponse(
      typeof response.data === "string"
        ? response.data
        : JSON.stringify(response.data),
      {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers["content-type"] ??
            "application/json",
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  return proxyRequest(request, context);
}
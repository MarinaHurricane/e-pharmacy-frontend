// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { isAxiosError } from "axios";
// import { serverApi } from "@/app/lib/api/server/serverApi";

// type Params = {
//   path: string[];
// };

// async function proxyRequest(
//   request: NextRequest,
//   { params }: { params: Promise<Params> }
// ) {
//   try {
//     const { path } = await params;

//     const endpoint = `/${path.join("/")}`;

//     const cookieStore = await cookies();

//     const body =
//       request.method === "GET" || request.method === "HEAD"
//         ? undefined
//         : await request.text();

//     const response = await serverApi.request({
//       method: request.method,
//       url: endpoint,

//       params: Object.fromEntries(
//         request.nextUrl.searchParams
//       ),

//       data: body || undefined,

//       headers: {
//         Cookie: cookieStore.toString(),

//         ...(request.headers.get("content-type")
//           ? {
//               "Content-Type":
//                 request.headers.get("content-type")!,
//             }
//           : {}),
//       },
//     });

//     const contentType = response.headers['content-type'];

//     return new NextResponse(
//       typeof response.data === "string"
//         ? response.data
//         : JSON.stringify(response.data),
//       {
//         status: response.status,
//         // headers: {
//         //   "Content-Type":
//         //     response.headers["content-type"] ??
//         //     "application/json",
//         // },
//            headers: {
//       'Content-Type':
//         typeof contentType === 'string'
//           ? contentType
//           : 'application/json',
//     },
//       }
//     );
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return NextResponse.json(
//         {
//           error: error.message,
//           response: error.response?.data,
//         },
//         {
//           status: error.response?.status ?? 500,
//         }
//       );
//     }

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<Params> }
// ) {
//   return proxyRequest(request, context);
// }

// export async function POST(
//   request: NextRequest,
//   context: { params: Promise<Params> }
// ) {
//   return proxyRequest(request, context);
// }

// export async function PATCH(
//   request: NextRequest,
//   context: { params: Promise<Params> }
// ) {
//   return proxyRequest(request, context);
// }

// export async function PUT(
//   request: NextRequest,
//   context: { params: Promise<Params> }
// ) {
//   return proxyRequest(request, context);
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: Promise<Params> }
// ) {
//   return proxyRequest(request, context);
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { isAxiosError } from 'axios';
// import { serverApi } from '@/app/lib/api/server/serverApi';

// type Params = {
//   path: string[];
// };

// async function proxyRequest(
//   request: NextRequest,
//   { params }: { params: Promise<Params> },
// ) {
//   try {
//     const { path } = await params;

//     const endpoint = `/${path.join('/')}`;

//     // Get cookies stored on the Vercel/frontend domain
//     const cookieStore = await cookies();

//     const body =
//       request.method === 'GET' || request.method === 'HEAD'
//         ? undefined
//         : await request.text();

//     // Send request from Next.js to the Render backend
//     const response = await serverApi.request({
//       method: request.method,
//       url: endpoint,

//       params: Object.fromEntries(request.nextUrl.searchParams),

//       data: body || undefined,

//       headers: {
//         // Forward browser cookies to the backend
//         Cookie: cookieStore.toString(),

//         ...(request.headers.get('content-type')
//           ? {
//               'Content-Type': request.headers.get('content-type')!,
//             }
//           : {}),
//       },
//     });

//     const contentType = response.headers['content-type'];

//     // Create the response that will be returned to the browser
//     const nextResponse = new NextResponse(
//       typeof response.data === 'string'
//         ? response.data
//         : JSON.stringify(response.data),
//       {
//         status: response.status,

//         headers: {
//           'Content-Type':
//             typeof contentType === 'string'
//               ? contentType
//               : 'application/json',
//         },
//       },
//     );

//     // IMPORTANT:
//     // Forward cookies created by the Express backend
//     // back to the browser.
//     const setCookies = response.headers['set-cookie'];

//     if (setCookies) {
//       for (const cookie of setCookies) {
//         nextResponse.headers.append('Set-Cookie', cookie);
//       }
//     }

//     return nextResponse;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return NextResponse.json(
//         {
//           error: error.message,
//           response: error.response?.data,
//         },
//         {
//           status: error.response?.status ?? 500,
//         },
//       );
//     }

//     return NextResponse.json(
//       {
//         error: 'Internal Server Error',
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<Params> },
// ) {
//   return proxyRequest(request, context);
// }

// export async function POST(
//   request: NextRequest,
//   context: { params: Promise<Params> },
// ) {
//   return proxyRequest(request, context);
// }

// export async function PATCH(
//   request: NextRequest,
//   context: { params: Promise<Params> },
// ) {
//   return proxyRequest(request, context);
// }

// export async function PUT(
//   request: NextRequest,
//   context: { params: Promise<Params> },
// ) {
//   return proxyRequest(request, context);
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: Promise<Params> },
// ) {
//   return proxyRequest(request, context);
// }

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { serverApi } from '@/app/lib/api/server/serverApi';

type Params = {
  path: string[];
};

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  try {
    const { path } = await params;

    const endpoint = `/${path.join('/')}`;

    const cookieStore = await cookies();

    const body =
      request.method === 'GET' || request.method === 'HEAD'
        ? undefined
        : await request.text();

    // Send request to the Render backend
    const response = await serverApi.request({
      method: request.method,
      url: endpoint,

      params: Object.fromEntries(request.nextUrl.searchParams),

      data: body || undefined,

      headers: {
        // Forward cookies from Vercel/browser to Render
        Cookie: cookieStore.toString(),

        ...(request.headers.get('content-type')
          ? {
              'Content-Type': request.headers.get('content-type')!,
            }
          : {}),
      },
    });

    const contentType = response.headers['content-type'];

    // 204 responses are not allowed to have a body
    const responseBody =
      response.status === 204
        ? null
        : typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data);

    const nextResponse = new NextResponse(responseBody, {
      status: response.status,

      headers:
        response.status === 204
          ? undefined
          : {
              'Content-Type':
                typeof contentType === 'string'
                  ? contentType
                  : 'application/json',
            },
    });

    // Forward Set-Cookie headers from Render back to the browser
    const setCookies = response.headers['set-cookie'];

    if (setCookies) {
      for (const cookie of setCookies) {
        nextResponse.headers.append('Set-Cookie', cookie);
      }
    }

    return nextResponse;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  return proxyRequest(request, context);
}
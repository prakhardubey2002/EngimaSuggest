import { NextResponse } from 'next/server';
import { logApiError, logApiInfo, logApiWarn } from '@/lib/api-log-helpers';

export const runtime = 'nodejs';

const ROUTE = 'POST /api/parse';

function backendBaseUrl(): string {
  const base = process.env.BACKENED_URL ?? 'http://127.0.0.1:3001';
  return base.replace(/\/+$/, '');
}

export async function POST(req: Request) {
  try {
    logApiInfo(ROUTE, 'request received (proxy to Nest)', { url: req.url });

    const contentType = req.headers.get('content-type');
    if (!contentType?.toLowerCase().includes('multipart/form-data')) {
      logApiWarn(ROUTE, 'validation failed', { code: 'INVALID_CONTENT_TYPE' });
      return NextResponse.json(
        {
          error: 'INVALID_CONTENT_TYPE',
          message: 'Expected multipart/form-data.',
        },
        { status: 400 },
      );
    }

    const body = await req.arrayBuffer();
    const upstreamUrl = `${backendBaseUrl()}/parse`;

    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
      },
      body,
    });

    const responseText = await upstream.text();
    const upstreamCt = upstream.headers.get('content-type') ?? 'application/json';

    if (upstream.ok) {
      try {
        const json = JSON.parse(responseText) as { text?: string; pages?: unknown[] };
        logApiInfo(ROUTE, 'parse success (proxied)', {
          filename: (json as { filename?: string }).filename,
          mimetype: (json as { mimetype?: string }).mimetype,
          size: (json as { size?: number }).size,
          textLength: json.text?.length ?? 0,
          pages: Array.isArray(json.pages) ? json.pages.length : undefined,
        });
      } catch {
        logApiInfo(ROUTE, 'parse success (proxied, non-json body)', {});
      }
    } else {
      logApiWarn(ROUTE, 'upstream error', {
        status: upstream.status,
        upstreamUrl,
        snippet: responseText.slice(0, 500),
      });
    }

    return new NextResponse(responseText, {
      status: upstream.status,
      headers: { 'Content-Type': upstreamCt },
    });
  } catch (err) {
    logApiError(ROUTE, 'proxy to Nest failed', err, {
      baseUrl: backendBaseUrl(),
    });
    return NextResponse.json(
      {
        error: 'UPSTREAM_UNAVAILABLE',
        message:
          'Could not reach the Nest parse API. Start the API (`npm run dev:api`) and set BACKENED_URL in apps/web/.env to match BACKENED_PORT on the backend.',
      },
      { status: 502 },
    );
  }
}

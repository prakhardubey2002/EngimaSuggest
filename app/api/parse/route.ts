import { NextResponse } from 'next/server';
import { getDocumentParser } from './parser';
import { ParseApiError } from './lib/parse-errors';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 25 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'FILE_REQUIRED', message: 'Expected multipart form-data field "file".' },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: 'FILE_TOO_LARGE',
          message: `Max file size is ${MAX_FILE_BYTES} bytes.`,
        },
        { status: 413 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const documentParser = getDocumentParser();
    const parsed = await documentParser.parse({
      buffer,
      mimetype: file.type,
      originalname: file.name,
      size: file.size,
    });

    return NextResponse.json(
      {
        filename: file.name,
        mimetype: file.type,
        size: file.size,
        ...parsed,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof ParseApiError) {
      return NextResponse.json(err.payload, { status: err.status });
    }

    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Failed to parse file.' },
      { status: 500 },
    );
  }
}


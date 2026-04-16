import { DocxParserService } from './docx-parser.service';
import { ImageOcrParserService } from './image-ocr-parser.service';
import { PdfParserService } from './pdf-parser.service';
import { TextParserService } from './text-parser.service';
import type { ParsedDocument, UploadedDoc } from './document-parser.types';
import { ParseApiError } from './parse-errors';

export class DocumentParserService {
  constructor(
    private readonly pdfParser: PdfParserService,
    private readonly docxParser: DocxParserService,
    private readonly imageParser: ImageOcrParserService,
    private readonly textParser: TextParserService,
  ) {}

  async parse(file: UploadedDoc): Promise<ParsedDocument> {
    const mt = (file.mimetype || '').toLowerCase();
    const name = (file.originalname || '').toLowerCase();

    if (mt === 'application/pdf' || name.endsWith('.pdf')) {
      return this.pdfParser.parse(file.buffer);
    }

    if (
      mt ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      name.endsWith('.docx')
    ) {
      return this.docxParser.parse(file.buffer);
    }

    if (mt === 'application/msword' || name.endsWith('.doc')) {
      throw new ParseApiError({
        status: 422,
        message: 'DOC_NOT_SUPPORTED_ON_SERVERLESS',
        payload: {
          error: 'DOC_NOT_SUPPORTED_ON_SERVERLESS',
          message:
            'Parsing .doc requires native converters (LibreOffice). Use .docx, .pdf, or run this API on a host with LibreOffice.',
        },
      });
    }

    if (mt.startsWith('image/')) {
      return this.imageParser.parse(file.buffer);
    }

    if (
      mt === 'text/plain' ||
      mt === 'application/x-tex' ||
      mt === 'text/x-tex' ||
      name.endsWith('.txt') ||
      name.endsWith('.tex') ||
      name.endsWith('.latex')
    ) {
      return this.textParser.parse(file.buffer);
    }

    throw new ParseApiError({
      status: 422,
      message: 'UNSUPPORTED_FILE_TYPE',
      payload: {
        error: 'UNSUPPORTED_FILE_TYPE',
        message: `Unsupported file type: ${file.mimetype || 'unknown'}`,
      },
    });
  }
}


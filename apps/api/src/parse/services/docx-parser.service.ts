import { Injectable } from '@nestjs/common';
import { ParsedDocument } from './document-parser.types';

@Injectable()
export class DocxParserService {
  async parse(input: Buffer): Promise<ParsedDocument> {
    // mammoth is serverless-friendly for .docx (pure JS)
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer: input });
    return { text: result.value || '' };
  }
}

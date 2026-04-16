import type { ParsedDocument } from './document-parser.types';

export class DocxParserService {
  async parse(input: Buffer): Promise<ParsedDocument> {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer: input });
    return { text: result.value || '' };
  }
}


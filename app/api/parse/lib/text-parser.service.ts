import type { ParsedDocument } from './document-parser.types';

export class TextParserService {
  parse(input: Buffer): ParsedDocument {
    return { text: input.toString('utf8') };
  }
}


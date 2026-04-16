import { Injectable } from '@nestjs/common';
import { ParsedDocument } from './document-parser.types';

@Injectable()
export class TextParserService {
  parse(input: Buffer): ParsedDocument {
    return { text: input.toString('utf8') };
  }
}

import { DocxParserService } from './lib/docx-parser.service';
import { DocumentParserService } from './lib/document-parser.service';
import { ImageOcrParserService } from './lib/image-ocr-parser.service';
import { PdfParserService } from './lib/pdf-parser.service';
import { TextParserService } from './lib/text-parser.service';

let singleton: DocumentParserService | null = null;

export function getDocumentParser(): DocumentParserService {
  if (!singleton) {
    singleton = new DocumentParserService(
      new PdfParserService(),
      new DocxParserService(),
      new ImageOcrParserService(),
      new TextParserService(),
    );
  }
  return singleton;
}


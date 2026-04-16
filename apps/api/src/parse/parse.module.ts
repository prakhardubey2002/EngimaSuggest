import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { DocumentParserService } from './services/document-parser.service';
import { DocxParserService } from './services/docx-parser.service';
import { ImageOcrParserService } from './services/image-ocr-parser.service';
import { PdfParserService } from './services/pdf-parser.service';
import { TextParserService } from './services/text-parser.service';

@Module({
  controllers: [ParseController],
  providers: [
    DocumentParserService,
    PdfParserService,
    DocxParserService,
    ImageOcrParserService,
    TextParserService,
  ],
})
export class ParseModule {}
